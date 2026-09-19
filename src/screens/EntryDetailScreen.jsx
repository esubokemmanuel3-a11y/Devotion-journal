import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { getDevotionalFor } from '../data/devotionals';
import { formatReadingLabel } from '../utils/dateHelpers';
import { TagPicker } from '../components/TagPicker';
import { ShareCardModal } from '../components/ShareCardModal';

export function EntryDetailScreen({ entryId, entriesApi, onBack, textScale = 1 }) {
  const { entries, saveEntry, deleteEntry } = entriesApi;
  const entry = entries.find((e) => e.id === entryId);

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(entry?.text ?? '');
  const [tags, setTags] = useState(entry?.tags ?? []);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [sharing, setSharing] = useState(false);

  if (!entry) {
    return (
      <div className="mx-auto w-full max-w-md px-5 pt-10">
        <button
          type="button"
          onClick={onBack}
          className="text-sm"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          ← Back
        </button>
        <p
          className="mt-6 text-sm"
          style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
        >
          That reflection isn't there anymore.
        </p>
      </div>
    );
  }

  const reading = getDevotionalFor(entry.month, entry.day)?.[entry.slot];

  // "On this day" — same month+day, different year. Scaffolded now so the
  // feature has real data to show once more than one year of entries exists.
  const onThisDay = entries
    .filter(
      (e) => e.month === entry.month && e.day === entry.day && e.year !== entry.year
    )
    .sort((a, b) => b.year - a.year);

  function handleSave() {
    saveEntry(entry.year, entry.month, entry.day, entry.slot, { text, tags });
    setEditing(false);
  }

  function handleDelete() {
    deleteEntry(entry.id);
    onBack();
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-10 pt-10">
      <button
        type="button"
        onClick={onBack}
        className="text-sm"
        style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
      >
        ← Back
      </button>

      <div className="mt-6 flex items-start justify-between">
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          {formatReadingLabel(entry.month, entry.day, entry.slot)}
        </p>
        {reading && (
          <button
            type="button"
            onClick={() => setSharing(true)}
            aria-label="Share this reading"
            style={{ color: 'var(--chrome)' }}
          >
            <Share2 size={16} strokeWidth={1.75} />
          </button>
        )}
      </div>

      {reading && (
        <div className="mt-3">
          <p
            className="italic leading-relaxed"
            style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)', fontSize: `${1.125 * textScale}rem` }}
          >
            "{reading.verse}"
          </p>
          <p className="mt-1" style={{ color: 'var(--brass)', fontFamily: 'var(--font-sans)', fontSize: `${0.875 * textScale}rem` }}>
            {reading.reference}
          </p>
        </div>
      )}

      <div className="mt-6 border-t pt-6" style={{ borderColor: 'var(--navy-line)' }}>
        {editing ? (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border bg-transparent p-3 text-base leading-relaxed outline-none"
              style={{
                borderColor: 'var(--navy-line)',
                backgroundColor: 'var(--navy-panel)',
                color: 'var(--parchment)',
                fontFamily: 'var(--font-serif)',
              }}
            />
            <div className="mt-3">
              <TagPicker tags={tags} onChange={setTags} />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-lg py-2.5 text-sm font-medium"
                style={{ backgroundColor: 'var(--brass)', color: 'var(--navy-deep)' }}
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setText(entry.text);
                  setTags(entry.tags);
                  setEditing(false);
                }}
                className="flex-1 rounded-lg border py-2.5 text-sm"
                style={{ borderColor: 'var(--navy-line)', color: 'var(--chrome)' }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p
              className="leading-relaxed"
              style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)', fontSize: `${1 * textScale}rem` }}
            >
              {entry.text}
            </p>

            {entry.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-0.5 text-xs"
                    style={{ color: 'var(--brass-bright)', backgroundColor: 'rgba(var(--brass-rgb), 0.08)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-sm"
                style={{ color: 'var(--brass-bright)', fontFamily: 'var(--font-sans)' }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="text-sm"
                style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
              >
                Delete
              </button>
            </div>

            {confirmingDelete && (
              <div
                className="mt-3 rounded-lg border p-3"
                style={{ borderColor: 'var(--navy-line)', backgroundColor: 'var(--navy-panel)' }}
              >
                <p className="text-sm" style={{ color: 'var(--parchment)', fontFamily: 'var(--font-sans)' }}>
                  Delete this reflection? This can't be undone.
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="text-sm font-medium"
                    style={{ color: '#e08a6b' }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(false)}
                    className="text-sm"
                    style={{ color: 'var(--chrome)' }}
                  >
                    Keep it
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-10 border-t pt-6" style={{ borderColor: 'var(--navy-line)' }}>
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          On this day
        </p>
        {onThisDay.length === 0 ? (
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
          >
            Once you've journaled on this date in another year, your past
            reflection will appear here alongside this one.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {onThisDay.map((e) => (
              <div
                key={e.id}
                className="rounded-lg border p-3"
                style={{ borderColor: 'var(--navy-line)', backgroundColor: 'var(--navy-panel)' }}
              >
                <p className="text-xs" style={{ color: 'var(--chrome)' }}>{e.year}</p>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
                >
                  {e.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {sharing && reading && (
        <ShareCardModal
          dateLabel={formatReadingLabel(entry.month, entry.day, entry.slot)}
          verse={reading.verse}
          reference={reading.reference}
          reflectionText={entry.text}
          onClose={() => setSharing(false)}
        />
      )}
    </div>
  );
}