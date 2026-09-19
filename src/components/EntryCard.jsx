import { ChevronRight } from 'lucide-react';
import { formatShortDate } from '../utils/dateHelpers';

/**
 * A single reflection preview. Click navigates to the full entry.
 */
export function EntryCard({ entry, onClick }) {
  const preview =
    entry.text.length > 140 ? `${entry.text.slice(0, 140)}…` : entry.text;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border p-4 text-left transition-colors hover:border-[var(--brass-dim)]"
      style={{
        backgroundColor: 'var(--navy-panel)',
        borderColor: 'var(--navy-line)',
      }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span
          className="text-xs uppercase tracking-wide"
          style={{ color: 'var(--chrome)', fontFamily: 'var(--font-sans)' }}
        >
          {formatShortDate(entry.month, entry.day)} · {entry.slot === 'morning' ? 'Morning' : 'Evening'}
        </span>
        <ChevronRight size={16} style={{ color: 'var(--chrome-dim)' }} />
      </div>

      <p
        className="mt-2 text-base leading-relaxed"
        style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
      >
        {preview}
      </p>

      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-xs"
              style={{
                color: 'var(--brass-bright)',
                backgroundColor: 'rgba(var(--brass-rgb), 0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}