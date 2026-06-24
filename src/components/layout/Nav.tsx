'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PixelAvatar from '../pixel/PixelAvatar';
import ThemeToggle from './ThemeToggle';

const pages = [
  { href: '/', label: '~/start' },
  { href: '/projekte', label: '~/projekte' },
  { href: '/blog', label: '~/blog' },
  { href: '/kontakt', label: '~/kontakt' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" onClick={close}>
          <PixelAvatar size={24} />
          <span>romanschulz.com</span>
        </Link>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {pages.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className={`nav-link ${pathname === p.href ? 'active' : ''}`}
              onClick={close}
            >
              {p.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '×' : '≡'}
        </button>
      </div>
    </nav>
  );
}
