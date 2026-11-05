import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';
export type Palette = 'default' | 'charcoal';

const THEME_KEY = 'theme';
const PALETTE_KEY = 'palette';
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// The page script in index.html sets data-theme and data-palette before the first paint.
function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getPalette(): Palette {
  return document.documentElement.dataset.palette === 'charcoal' ? 'charcoal' : 'default';
}

function remember(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode: the choice just lasts for this visit.
  }
}

/** Dark or light, and independently the default or charcoal palette. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme);
  const palette = useSyncExternalStore(subscribe, getPalette, () => 'default' as Palette);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    remember(THEME_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  const setPalette = useCallback((next: Palette) => {
    if (next === 'default') delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = next;
    remember(PALETTE_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  return { theme, setTheme, palette, setPalette };
}
