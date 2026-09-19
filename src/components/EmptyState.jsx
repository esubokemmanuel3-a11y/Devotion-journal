/**
 * An empty screen is an invitation to act, not just an absence notice.
 * `action` is optional: { label, onClick }.
 */
export function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <h2
        className="text-lg"
        style={{ color: 'var(--parchment)', fontFamily: 'var(--font-serif)' }}
      >
        {title}
      </h2>
      <p
        className="max-w-xs text-sm leading-relaxed"
        style={{ color: 'var(--parchment-dim)', fontFamily: 'var(--font-sans)' }}
      >
        {message}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 rounded-full border px-4 py-2 text-sm transition-colors"
          style={{
            borderColor: 'var(--brass-dim)',
            color: 'var(--brass-bright)',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
