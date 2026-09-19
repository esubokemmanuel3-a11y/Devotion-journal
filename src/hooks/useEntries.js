import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'daily-light-journal:entries';

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/** One reflection per year+month+day+slot. */
function matchesSlot(entry, year, month, day, slot) {
  return (
    entry.year === year &&
    entry.month === month &&
    entry.day === day &&
    entry.slot === slot
  );
}

export function useEntries() {
  const [entries, setEntries] = useState(loadEntries);

  useEffect(() => {
    persistEntries(entries);
  }, [entries]);

  /** Returns the saved reflection for this exact date+slot, or null. */
  const getEntry = useCallback(
    (year, month, day, slot) =>
      entries.find((e) => matchesSlot(e, year, month, day, slot)) ?? null,
    [entries]
  );

  /** Creates or updates the single reflection for a date+slot. */
  const saveEntry = useCallback((year, month, day, slot, { text, tags }) => {
    setEntries((prev) => {
      const existing = prev.find((e) => matchesSlot(e, year, month, day, slot));
      const now = new Date().toISOString();

      if (existing) {
        return prev.map((e) =>
          e.id === existing.id ? { ...e, text, tags, updatedAt: now } : e
        );
      }

      const newEntry = {
        id: crypto.randomUUID(),
        year,
        month,
        day,
        slot,
        text,
        tags,
        createdAt: now,
        updatedAt: now,
      };
      return [...prev, newEntry];
    });
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  /** Newest first, by (year, month, day, slot — evening after morning). */
  const timeline = [...entries].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    if (a.day !== b.day) return b.day - a.day;
    return a.slot === b.slot ? 0 : a.slot === 'evening' ? -1 : 1;
  });

  /** Case-insensitive keyword match against text, plus optional tag filter. */
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

  /** All distinct tags in use, for the filter picker. */
  const allTags = [...new Set(entries.flatMap((e) => e.tags))].sort();

  return {
    entries,
    timeline,
    getEntry,
    saveEntry,
    deleteEntry,
    searchEntries,
    allTags,
  };
}
