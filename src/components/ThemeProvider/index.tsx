import './style.css';

import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import type { ThemeContextValue, ThemeMode } from '../../types/theme';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/storage';
import { THEME_STORAGE_KEY } from './consts';
import { ThemeContext } from './context';

function readInitialThemeMode(): ThemeMode {
  const stored = getLocalStorageItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>(() => readInitialThemeMode());

  useEffect(() => {
    document.documentElement.dataset['theme'] = mode;
    setLocalStorageItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return (
    <ThemeContext value={value}>
      <div className="ThemeProvider">{children}</div>
    </ThemeContext>
  );
}

