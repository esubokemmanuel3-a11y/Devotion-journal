import { useCallback, useState } from 'react';

const KEY = 'daily-light-journal:preferences';

const SCALES = {
  small: { label: 'Small', multiplier: 0.9 },
  medium: { label: 'Medium', multiplier: 1 },
  large: { label: 'Large', multiplier: 1.18 },
};

export const THEMES = {
  light: { label: 'Sunlit Page' },
  dark: { label: 'Study Lamp' },
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      textSize: parsed.textSize && SCALES[parsed.textSize] ? parsed.textSize : 'medium',
      theme: parsed.theme && THEMES[parsed.theme] ? parsed.theme : 'light',
    };
  } catch {
    return { textSize: 'medium', theme: 'light' };
  }
}

function persist(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function usePreferences() {
  const [state, setState] = useState(load);

  const setTextSize = useCallback((size) => {
    if (!SCALES[size]) return;
    setState((prev) => {
      const next = { ...prev, textSize: size };
      persist(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((theme) => {
    if (!THEMES[theme]) return;
    setState((prev) => {
      const next = { ...prev, theme };
      persist(next);
      return next;
    });
  }, []);

  return {
    textSize: state.textSize,
    setTextSize,
    theme: state.theme,
    setTheme,
    scaleOf: (size) => SCALES[size]?.multiplier ?? 1,
  };
}

export const TEXT_SIZES = SCALES;