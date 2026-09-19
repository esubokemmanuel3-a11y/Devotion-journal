import { TEXT_SIZES } from '../hooks/usePreferences';

export function TextSizeControl({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {Object.entries(TEXT_SIZES).map(([key, { label }]) => {
        const isActive = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className="flex-1 rounded-lg border py-2 text-sm transition-colors"
            style={{
              borderColor: isActive ? 'var(--brass)' : 'var(--navy-line)',
              color: isActive ? 'var(--brass-bright)' : 'var(--chrome)',
              backgroundColor: isActive ? 'rgba(var(--brass-rgb), 0.08)' : 'transparent',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}