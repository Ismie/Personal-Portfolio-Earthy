'use client';

import { useEffect, useState } from 'react';
import PixelSprite from '../pixel/PixelSprite';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setTheme((document.documentElement.dataset.theme as Theme) || 'light');
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Helles Theme' : 'Dunkles Theme'}
      title="Hell / Dunkel"
    >
      {theme ? (
        <PixelSprite name={theme === 'dark' ? 'sun' : 'moon'} size={22} />
      ) : (
        <span style={{ width: 22, height: 22, display: 'block' }} />
      )}
    </button>
  );
}
