'use client';

import { useState } from 'react';
import PixelAvatar from '../pixel/PixelAvatar';

type NavProps = { route: string; setRoute: (route: string) => void };

const pages = [
  { key: 'home', label: '~/start' },
  { key: 'projects', label: '~/projekte' },
  { key: 'blog', label: '~/blog' },
  { key: 'contact', label: '~/kontakt' },
];

export default function Nav({ route, setRoute }: NavProps) {
  const [open, setOpen] = useState(false);
  const go = (k: string) => { setRoute(k); setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); go('home'); }}>
          <PixelAvatar size={24} />
          <span>roman-schulz.de</span>
        </a>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '×' : '≡'}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {pages.map(p => (
            <a
              key={p.key}
              href="#"
              className={`nav-link ${route === p.key ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); go(p.key); }}
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
