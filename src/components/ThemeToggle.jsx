import { Sun, Moon } from 'lucide-react';
import { THEMES } from '../hooks/usePreferences';

const ICONS = { light: Sun, dark: Moon };

export function ThemeToggle({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {Object.entries(THEMES).map(([key, { label }]) => {
        const isActive = value === key;
        const Icon = ICONS[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm transition-colors"
            style={{
              borderColor: isActive ? 'var(--brass)' : 'var(--navy-line)',
              color: isActive ? 'var(--brass-bright)' : 'var(--chrome)',
              backgroundColor: isActive ? 'rgba(var(--brass-rgb), 0.08)' : 'transparent',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        );
      })}
    </div>
  );
}