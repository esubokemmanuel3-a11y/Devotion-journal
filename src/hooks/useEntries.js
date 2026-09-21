import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function fromRow(row) {
  return {
    id: row.id,
    year: row.year,
    month: row.month,
    day: row.day,
    slot: row.slot,
    text: row.text,
    tags: row.tags ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function matchesSlot(entry, year, month, day, slot) {
  return (
    entry.year === year &&
    entry.month === month &&
    entry.day === day &&
    entry.slot === slot
  );
}

export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .order('day', { ascending: false });

    if (error) {
      console.error('Failed to load entries:', error.message);
      setEntries([]);
    } else {
      setEntries(data.map(fromRow));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEntries();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadEntries();
    });
    return () => listener.subscription.unsubscribe();
  }, [loadEntries]);

  const getEntry = useCallback(
    (year, month, day, slot) =>
      entries.find((e) => matchesSlot(e, year, month, day, slot)) ?? null,
    [entries]
  );

  /** Creates or updates the single reflection for a date+slot. */
  const saveEntry = useCallback(async (year, month, day, slot, { text, tags }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('entries')
      .upsert(
        { user_id: user.id, year, month, day, slot, text, tags, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,year,month,day,slot' }
      )
      .select()
      .single();

    if (error) {
      console.error('Failed to save entry:', error.message);
      return;
    }

    setEntries((prev) => {
      const existing = prev.find((e) => matchesSlot(e, year, month, day, slot));
      const saved = fromRow(data);
      return existing
        ? prev.map((e) => (e.id === existing.id ? saved : e))
        : [...prev, saved];
    });
  }, []);

  const deleteEntry = useCallback(async (id) => {
    const { error } = await supabase.from('entries').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete entry:', error.message);
      return;
    }
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  /** Newest first, by (year, month, day, slot — evening after morning). */
  const timeline = [...entries].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    if (a.day !== b.day) return b.day - a.day;
    return a.slot === b.slot ? 0 : a.slot === 'evening' ? -1 : 1;
  });

  const searchEntries = useCallback(
    (keyword, tag) => {
      const kw = keyword.trim().toLowerCase();
      return timeline.filter((e) => {
        const matchesKeyword = kw ? e.text.toLowerCase().includes(kw) : true;
        const matchesTag = tag ? e.tags.includes(tag) : true;
        return matchesKeyword && matchesTag;
      });
    },
    [timeline]
  );

  const allTags = [...new Set(entries.flatMap((e) => e.tags))].sort();

  return {
    entries,
    timeline,
    loading,
    getEntry,
    saveEntry,
    deleteEntry,
    searchEntries,
    allTags,
  };
}
