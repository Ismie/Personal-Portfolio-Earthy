# Pages → Next.js App Router Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the four page components from `src/pages/pages.jsx` into the Next.js 16 App Router with file-based routing, a shared Nav/Footer layout shell, and a `LoadingScreen` overlay on every route change.

**Architecture:** Each page becomes a dedicated `app/[route]/page.tsx` Server or Client Component. A new `PageTransition` client component in the root layout watches `usePathname()` and overlays `LoadingScreen` on every navigation. Shared data (`projectsAll`) moves to `src/data/projects.ts`. Shared UI fragments (`TypewriterRole`, `ProjectCard`) become standalone components.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, `next/link`, `next/navigation`

---

## File Map

| File | Action |
|------|--------|
| `src/data/projects.ts` | Create — typed `projectsAll` array |
| `src/components/TypewriterRole.tsx` | Create — `'use client'`, extracted from pages.jsx |
| `src/components/ProjectCard.tsx` | Create — `'use client'`, extracted from pages.jsx |
| `src/components/LoadingScreen.tsx` | Modify — add `duration` prop (default 1500) |
| `src/components/layout/PageTransition.tsx` | Create — `'use client'`, pathname watcher |
| `src/components/layout/Nav.tsx` | Modify — `next/link` + `usePathname`, drop props |
| `app/layout.tsx` | Modify — add Nav, Footer, PageTransition; `lang="de"` |
| `app/page.tsx` | Replace — HomePage, Server Component |
| `app/projekte/page.tsx` | Create — ProjectsPage, Server Component |
| `app/blog/page.tsx` | Create — BlogPage, `'use client'` |
| `app/kontakt/page.tsx` | Create — ContactPage, `'use client'` |
| `src/pages/pages.jsx` | Delete — fully superseded |

---

### Task 1: Create `src/data/projects.ts`

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the file**

```ts
export type Project = {
  name: string;
  sub: string;
  desc: string;
  tags: string[];
  year: string;
  status: string;
  link: string | null;
  accent: boolean;
};

export const projectsAll: Project[] = [
  {
    name: 'Codo',
    sub: 'Produktdokumentationsportal · Laravel Nova',
    desc: 'Multi-Mandanten-Plattform zur strukturierten Verwaltung und Präsentation technischer Produktdokumentation. Custom-Frontend mit markenspezifischem Design je Kunde (u.a. Kemper, Muli Cycles).',
    tags: ['laravel', 'nova', 'multi-tenant', 'mysql'],
    year: '2025',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Neumärker Thermocook',
    sub: 'Connected-Product-Portal · Laravel Nova',
    desc: 'Community-Plattform für ein internetverbundenes Waffeleisen: User-Generated Content (Rezepte, Bewertungen, Likes, Moderation), bidirektionaler Datenaustausch mit Gerät und Shop-System, Dual-Datenbank-Anbindung, Gerätelizenzierung und vollständiges Auth-System.',
    tags: ['laravel', 'nova', 'iot', 'dual-db'],
    year: '2025',
    status: 'in betrieb',
    link: 'neumaerker.de',
    accent: true,
  },
  {
    name: 'BAISO',
    sub: 'Arbeitssicherheits-Informationssystem · Neuentwicklung',
    desc: 'Mandantenfähige SaaS-Plattform für rechtssicheres Arbeitsschutzmanagement: Gefährdungsbeurteilungen, Gefahrstoffverzeichnis, Betriebsorganisation und Unfallstatistik. Kunden erhalten individuelle Instanzen mit branchenspezifischen Vorlagen und rollenbasierter Rechteverwaltung.',
    tags: ['laravel', 'saas', 'rbac', 'mysql'],
    year: '2024',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Kirchhoff K>NET',
    sub: 'Konzernintranet · TYPO3',
    desc: 'Entwicklung und laufende Pflege eines unternehmensweiten Intranets mit Nutzerforum, SharePoint-Contentanbindung, Career-System (PDF-Generierung) und diversen API-Integrationen (Microsoft, Wetter, KI, Übersetzung, Tracking) sowie einem Custom-KPI-Dashboard mit Quartalsvergleichen.',
    tags: ['typo3', 'sharepoint', 'ms-graph', 'kpi'],
    year: '2024',
    status: 'in pflege',
    link: null,
    accent: true,
  },
  {
    name: 'Widerruf-Button-Konfigurator',
    sub: 'Shop-übergreifendes Tool',
    desc: 'Konfigurierbares Tool zur automatisierten, gesetzeskonformen Einbindung des Widerruf-Buttons in verschiedene Shop-Systeme (Shopware, JTL, XT-Commerce u.a.) inkl. automatisiertem E-Mail-Versand und Individualisierungsoptionen.',
    tags: ['php', 'shopware', 'jtl', 'xt-commerce'],
    year: '2024',
    status: 'shipped',
    link: null,
    accent: true,
  },
  {
    name: 'MyLogoWaffel-Konfigurator',
    sub: 'Neumärker · interaktiver Konfigurator',
    desc: 'Interaktives Konfigurationstool für individuelle Waffelbackplatten mit eigenem Logo-Upload, SVG-Umrechnung und Schwellwertberechnung für CNC-Fräsvorlagen. Ein bisschen Bildverarbeitung, ein bisschen Geometrie, sehr viele Waffeln.',
    tags: ['javascript', 'svg', 'canvas', 'cnc'],
    year: '2024',
    status: 'shipped',
    link: 'neumaerker.de',
    accent: true,
  },
  {
    name: 'NWB Akademie',
    sub: 'E-Training-Management-Plattform',
    desc: 'Umsetzung einer browserbasierten Lernplattform für digitale Weiterbildungskurse inklusive Kursmanagement und Nutzertracking. SCORM-tauglich, mit ordentlich Edge-Cases im Reporting.',
    tags: ['php', 'scorm', 'mysql'],
    year: '2024',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Reflex Group',
    sub: 'Corporate Website',
    desc: 'TYPO3-basierte Unternehmenswebsite — Konzeption der Inhaltsstruktur, mehrsprachige Pflege, Performance- und SEO-Optimierung.',
    tags: ['typo3', 'seo', 'i18n'],
    year: '2024',
    status: 'in pflege',
    link: 'reflexgroup.de',
    accent: true,
  },
  {
    name: 'Quilt Cabin',
    sub: 'Shop-Projekt',
    desc: 'Shop-System-Umsetzung mit individuell angepasstem Frontend und Pflege im laufenden Betrieb.',
    tags: ['shopware', 'frontend', 'seo'],
    year: '2024',
    status: 'in pflege',
    link: 'quiltcabin.de',
    accent: true,
  },
];
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add typed projects data"
```

---

### Task 2: Create `src/components/TypewriterRole.tsx`

**Files:**
- Create: `src/components/TypewriterRole.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState, useEffect } from 'react';

const roles = [
  'full-stack-webentwickler · laravel · cms',
  'typo3 · shopware · jtl-shop',
  'agenturpraxis · iserlohn · seit 2024',
];

export default function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'erasing' | 'done'>('typing');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const target = roles[idx];
    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 45);
      } else {
        if (idx === roles.length - 1) {
          setPhase('done');
        } else {
          timer = setTimeout(() => setPhase('erasing'), 1700);
        }
      }
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 24);
      } else {
        setIdx((idx + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx]);

  return (
    <div className="hero-role">
      <span className="bracket">[ </span>
      <span>{text}</span>
      <span className="cursor" />
      <span className="bracket"> ]</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TypewriterRole.tsx
git commit -m "feat: add TypewriterRole component"
```

---

### Task 3: Create `src/components/ProjectCard.tsx`

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Depends on: `src/data/projects.ts` (Task 1)

- [ ] **Step 1: Create the file**

```tsx
'use client';

import type { Project } from '../data/projects';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <a className="card project" href="#" onClick={(e) => e.preventDefault()}>
      {p.accent ? <span className="card-accent-bar" /> : null}
      <div className="project-top">
        <div>
          <div className="project-name">{p.name}</div>
          {p.sub ? <div className="project-sub">{p.sub}</div> : null}
        </div>
        <div className="project-meta">{p.year} · {p.status}</div>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-foot">
        <div className="tags">
          {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        {p.link ? <span className="project-link">{p.link} ↗</span> : null}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 4: Add `duration` prop to `src/components/LoadingScreen.tsx`

**Files:**
- Modify: `src/components/LoadingScreen.tsx`

The `duration` prop replaces the hardcoded `1500` main timer. The 320ms fade-out stays fixed.

- [ ] **Step 1: Update the type and useEffect**

Replace the current top of the file through the end of the useEffect. Current file at `/home/daniel/Projects/roman-schulz.de/src/components/LoadingScreen.tsx`:

Change:
```tsx
type LoadingScreenProps = { onDone: () => void };
```
To:
```tsx
type LoadingScreenProps = { onDone: () => void; duration?: number };
```

Change the function signature:
```tsx
export default function LoadingScreen({ onDone }: LoadingScreenProps) {
```
To:
```tsx
export default function LoadingScreen({ onDone, duration = 1500 }: LoadingScreenProps) {
```

Change the useEffect:
```tsx
  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % 8), 100);
    let t2: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setGone(true);
      t2 = setTimeout(onDone, 320);
    }, 1500);
    return () => { clearInterval(iv); clearTimeout(t); clearTimeout(t2); };
  }, [onDone]);
```
To:
```tsx
  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % 8), 100);
    let t2: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setGone(true);
      t2 = setTimeout(onDone, 320);
    }, duration);
    return () => { clearInterval(iv); clearTimeout(t); clearTimeout(t2); };
  }, [onDone, duration]);
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/LoadingScreen.tsx
git commit -m "feat: add duration prop to LoadingScreen"
```

---

### Task 5: Create `src/components/layout/PageTransition.tsx`

**Files:**
- Create: `src/components/layout/PageTransition.tsx`
- Depends on: `src/components/LoadingScreen.tsx` (Task 4)

`useRef` tracks the previous pathname so the overlay does not appear on initial load — only on subsequent navigations. `LoadingScreen` renders on top of `children`; the new page is already beneath it and reveals when the overlay clears.

**Note on Next.js Link scroll behaviour:** `Link` maintains scroll position by default. The Nav (Task 6) handles scroll-to-top explicitly; PageTransition does not need to.

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import LoadingScreen from '../LoadingScreen';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      setLoading(true);
    }
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen duration={400} onDone={() => setLoading(false)} />}
      {children}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/PageTransition.tsx
git commit -m "feat: add PageTransition component"
```

---

### Task 6: Update `src/components/layout/Nav.tsx`

**Files:**
- Modify: `src/components/layout/Nav.tsx`

Drop `route`/`setRoute` props. Use `usePathname()` for active state and `Link` from `next/link` for navigation. Keep `window.scrollTo` in onClick — Next.js `Link` preserves scroll position by default and does not auto-scroll to top.

- [ ] **Step 1: Replace the entire file**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PixelAvatar from '../pixel/PixelAvatar';

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
          <span>roman-schulz.de</span>
        </Link>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '×' : '≡'}
        </button>
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
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "refactor: update Nav to use next/link and usePathname"
```

---

### Task 7: Update `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

Add Nav, Footer, PageTransition to the layout shell. Update `lang` to `"de"`. Update metadata. Preserve existing Geist font setup.

- [ ] **Step 1: Replace the entire file**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '@/src/components/layout/Nav';
import Footer from '@/src/components/layout/Footer';
import PageTransition from '@/src/components/layout/PageTransition';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Roman Schulz · Full-Stack-Webentwickler',
  description: 'Full-Stack-Webentwickler mit Schwerpunkt auf Laravel, CMS-Lösungen und E-Commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add Nav, Footer, PageTransition to root layout"
```

---

### Task 8: Replace `app/page.tsx` with HomePage

**Files:**
- Modify: `app/page.tsx`
- Depends on: Tasks 1, 2, 3

Server Component. CTA buttons use `<Link>` instead of onClick handlers, so no `'use client'` needed. `experience` and `skills` data stay inline (only used here).

- [ ] **Step 1: Replace the entire file**

```tsx
import Link from 'next/link';
import TypewriterRole from '@/src/components/TypewriterRole';
import ProjectCard from '@/src/components/ProjectCard';
import Divider from '@/src/components/layout/Divider';
import PixelSprite from '@/src/components/pixel/PixelSprite';
import { projectsAll } from '@/src/data/projects';

const experience = [
  {
    period: 'seit 05.2024',
    sub: '(Praktikum 04–05.2024)',
    role: 'Programmierer / Full-Stack-Webentwickler',
    company: 'Everscreen Medienagentur · Iserlohn',
    desc: 'Agenturpraxis quer durchs Web: Laravel-Anwendungen, CMS-Pflege und -Entwicklung (TYPO3, WordPress, Shopware, JTL, XT-Commerce), Intranet-Systeme, Konfiguratoren, Performance-Tuning und Serveradministration für mittelständische Kunden.',
  },
];

const skills = [
  { label: 'Backend',    items: ['PHP', 'Laravel', 'Nova', 'Python', 'Java', 'Node.js'] },
  { label: 'Frontend',   items: ['JavaScript', 'TypeScript', 'React', 'jQuery', 'HTML5', 'CSS3'] },
  { label: 'CMS / Shop', items: ['TYPO3', 'WordPress', 'Shopware', 'JTL-Shop', 'XT-Commerce'] },
  { label: 'Daten',      items: ['MySQL', 'MariaDB', 'SQL-Tuning', 'Dual-DB'] },
  { label: 'DevOps',     items: ['Linux', 'Git', 'CI/CD', 'Hosting', 'Caching', 'Security'] },
  { label: 'Marketing',  items: ['GA4', 'Google Ads', 'Matomo', 'SEO', 'KI-Anbindungen'] },
];

export default function HomePage() {
  const featured = projectsAll.slice(0, 3);
  return (
    <div className="page">
      <section className="hero wrap">
        <div className="hero-sprite">
          <PixelSprite size={48} label="terminal.png" />
        </div>
        <h1 className="hero-name">Roman<span className="dot">.</span></h1>
        <TypewriterRole />
        <p className="hero-sub">
          Full-Stack-Webentwickler mit Schwerpunkt auf Laravel, CMS-Lösungen und E-Commerce.
          Ich baue Kundenportale, Intranets und Konfiguratoren — vom Konzept bis zur Pflege.
          M.Sc. Medieninformatik, zuhause in Hemer.
        </p>
        <div className="hero-cta">
          <Link href="/projekte" className="btn btn-primary">projekte ansehen →</Link>
          <Link href="/kontakt" className="btn btn-ghost">kontakt aufnehmen</Link>
        </div>
      </section>

      <Divider />

      <section className="wrap about">
        <div className="about-label">// über mich</div>
        <div className="about-body">
          <p>
            Ich bin <strong>Full-Stack-Entwickler</strong> bei der Everscreen Medienagentur
            in Iserlohn. Mein Tagesgeschäft sind <strong>maßgeschneiderte Laravel-Anwendungen</strong>,
            Konzern-Intranets in TYPO3 und Shop-Lösungen für mittelständische Kunden — vom
            ersten Architektur-Sketch bis zur fünf Jahre alten Bestandspflege.
          </p>
          <p>
            Ich mag Systeme, die <strong>lange halten</strong>: saubere Datenmodelle, ehrliche
            APIs, ein DX-Niveau, bei dem auch der Kollege in zwei Jahren noch weiß, was los
            ist. Abseits des Bildschirms: 3D-Modellierung, Langstreckenlauf, Badminton.
          </p>
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// werdegang</h2>
          <div className="meta">aktuell</div>
        </div>
        <div className="exp-list">
          {experience.map((x, i) => (
            <div className="exp-row" key={i}>
              <div className="exp-period">
                <div>{x.period}</div>
                {x.sub ? <div className="exp-sub">{x.sub}</div> : null}
              </div>
              <div className="exp-body">
                <div className="exp-role">{x.role}</div>
                <div className="exp-company">{x.company}</div>
                <p className="exp-desc">{x.desc}</p>
              </div>
            </div>
          ))}
          <div className="exp-row">
            <div className="exp-period"><div>10.2019 – 04.2023</div></div>
            <div className="exp-body">
              <div className="exp-role">M.Sc. Medieninformatik &amp; Interaktives Entertainment</div>
              <div className="exp-company">Hochschule Mittweida</div>
            </div>
          </div>
          <div className="exp-row">
            <div className="exp-period"><div>09.2015 – 10.2019</div></div>
            <div className="exp-body">
              <div className="exp-role">B.Sc. Medieninformatik &amp; Interaktives Entertainment</div>
              <div className="exp-company">Hochschule Mittweida</div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// stack</h2>
          <div className="meta">womit ich täglich arbeite</div>
        </div>
        <div className="skills-grid">
          {skills.map(s => (
            <div className="skill-block" key={s.label}>
              <div className="skill-label">{s.label}</div>
              <div className="tags">
                {s.items.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// ausgewählte projekte</h2>
          <div className="meta">3 von {projectsAll.length}</div>
        </div>
        <div className="feat-list">
          {featured.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
        <Link href="/projekte" className="see-all">
          alle projekte <span className="arrow">→</span>
        </Link>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace boilerplate page.tsx with HomePage"
```

---

### Task 9: Create `app/projekte/page.tsx`

**Files:**
- Create: `app/projekte/page.tsx`
- Depends on: Tasks 1, 3

Server Component — no hooks, no event handlers (ProjectCard is a client child, which is fine).

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p app/projekte
```

```tsx
import ProjectCard from '@/src/components/ProjectCard';
import Divider from '@/src/components/layout/Divider';
import { projectsAll } from '@/src/data/projects';

export default function ProjectsPage() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>projekte<span className="dot">.</span></h1>
        <p>
          Auswahl aus der Agenturpraxis bei Everscreen — Laravel-Plattformen, TYPO3-Intranets,
          Konfiguratoren und Shop-Lösungen. Stand 2024/2025, alles in produktivem Einsatz oder
          in laufender Pflege.
        </p>
      </header>
      <div className="section-head">
        <h2>// katalog</h2>
        <div className="meta">{projectsAll.length} einträge</div>
      </div>
      <div className="project-list">
        {projectsAll.map(p => <ProjectCard key={p.name} p={p} />)}
      </div>
      <Divider />
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>
        ende der liste · weitere referenzen auf anfrage
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/projekte/page.tsx
git commit -m "feat: add /projekte page"
```

---

### Task 10: Create `app/blog/page.tsx`

**Files:**
- Create: `app/blog/page.tsx`

`'use client'` because of `onClick` handlers on placeholder post links. `featuredPost` and `recentPosts` stay inline (only used here).

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p app/blog
```

```tsx
'use client';

import Divider from '@/src/components/layout/Divider';

const featuredPost = {
  date: '2025-11-04',
  readTime: '11 min',
  title: 'Laravel Nova für Multi-Mandanten-Portale: was wirklich skaliert',
  excerpt: 'Drei Codo-Iterationen und ein Connected-Product-Portal später: hier ist die Resource-Struktur, die Policies und das Theming-Pattern, mit dem Nova auch bei 12 Mandanten noch übersichtlich bleibt.',
  tag: 'aus der praxis',
};

const recentPosts = [
  {
    date: '2025-09-21',
    readTime: '7 min',
    title: 'TYPO3 + SharePoint: eine Integration, die nicht weh tut',
    excerpt: 'Wie wir das Kirchhoff-Intranet an Microsoft Graph angeschlossen haben — Auth, Caching, und der Trick mit den Drive-IDs.',
  },
  {
    date: '2025-07-12',
    readTime: '5 min',
    title: 'Dual-Database in Laravel: wenn ein Connection-String nicht reicht',
    excerpt: 'Geräte-Telemetrie schreibt auf DB A, der Shop liest aus DB B. Eloquent, Migrations und Tests in einer 2-DB-Welt.',
  },
  {
    date: '2025-05-30',
    readTime: '6 min',
    title: 'SVG → CNC: Schwellwerte, die wirklich fräsbar sind',
    excerpt: 'Lessons learned aus dem MyLogoWaffel-Konfigurator — Vektorisierung, Schwellwerte und warum 1mm doch viel ist.',
  },
];

export default function BlogPage() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>blog<span className="dot">.</span></h1>
        <p>
          Notizen aus dem Tagesgeschäft — meist Laravel, CMS-Architektur und der eine
          oder andere Konfigurator, der mehr Mühe gemacht hat als geplant.
        </p>
      </header>

      <a href="#" className="blog-featured" onClick={(e) => e.preventDefault()}>
        <div className="blog-featured-img">
          <div className="pixel-art-tile">
            <span className="label">[ titelbild · 480×320 ]</span>
          </div>
        </div>
        <div className="blog-featured-body">
          <div className="blog-featured-tag">★ {featuredPost.tag}</div>
          <h2 className="blog-featured-title">{featuredPost.title}</h2>
          <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
          <div className="blog-featured-meta">
            <span>{featuredPost.date}</span>
            <span>·</span>
            <span>{featuredPost.readTime}</span>
          </div>
        </div>
      </a>

      <div className="section-head" style={{ marginTop: 48 }}>
        <h2>// zuletzt</h2>
        <div className="meta">3 aktuelle</div>
      </div>

      <div className="blog-grid">
        {recentPosts.map(p => (
          <a key={p.title} href="#" className="card blog-card" onClick={(e) => e.preventDefault()}>
            <div className="blog-card-date">{p.date}</div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <div className="blog-card-readtime">{p.readTime} lesen →</div>
          </a>
        ))}
      </div>

      <Divider />
      <div style={{ textAlign: 'center' }}>
        <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>
          archiv · alle beiträge
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: add /blog page"
```

---

### Task 11: Create `app/kontakt/page.tsx`

**Files:**
- Create: `app/kontakt/page.tsx`

`'use client'` because of form state. Adds proper TypeScript types for `FormState`, `FormErrors`, and event handlers — an improvement over the original JSX.

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p app/kontakt
```

```tsx
'use client';

import { useState } from 'react';
import PixelSprite from '@/src/components/pixel/PixelSprite';

type FormState = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'bitte angeben.';
    if (!form.email.trim()) e.email = 'bitte angeben.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'das sieht nicht nach einer e-mail aus.';
    if (!form.message.trim()) e.message = 'bitte angeben.';
    else if (form.message.trim().length < 10) e.message = 'noch ein bisschen mehr, bitte.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 900);
  };

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>kontakt<span className="dot">.</span></h1>
        <p>
          Interessantes Projekt im Bereich Laravel, CMS oder E-Commerce? Schreib mir gerne —
          eine kurze Beschreibung, was ihr vorhabt, reicht für den Anfang.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-side">
          <h3>kanäle</h3>
          <p>
            Am schnellsten erreichst du mich per E-Mail oder Telefon. Postanschrift nur für
            offizielle Schreiben — alles andere geht digital.
          </p>
          <div className="contact-channels">
            <a className="channel" href="mailto:kontakt@romanschulz.com">
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">e-mail</div>
                <div className="channel-value">kontakt@romanschulz.com</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <a className="channel" href="tel:+4915905301529">
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">telefon</div>
                <div className="channel-value">+49 159 05301529</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <div className="channel" style={{ cursor: 'default' }}>
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">postanschrift</div>
                <div className="channel-value" style={{ lineHeight: 1.5 }}>
                  Clara-Schumann-Str. 7<br />58675 Hemer
                </div>
              </div>
            </div>
            <a className="channel" href="#" onClick={(e) => e.preventDefault()}>
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">linkedin</div>
                <div className="channel-value">in/romanschulz</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label>name</label>
            <input value={form.name} onChange={set('name')} placeholder="wer schreibt da?" />
            {errors.name ? <span className="err">{errors.name}</span> : null}
          </div>
          <div className="field">
            <label>e-mail</label>
            <input value={form.email} onChange={set('email')} placeholder="wohin antworten?" />
            {errors.email ? <span className="err">{errors.email}</span> : null}
          </div>
          <div className="field">
            <label>betreff <span style={{ opacity: .5 }}>(optional)</span></label>
            <input value={form.subject} onChange={set('subject')} placeholder="kurz und knapp" />
          </div>
          <div className="field">
            <label>nachricht</label>
            <textarea rows={6} value={form.message} onChange={set('message')} placeholder="erzähl mir, worum es geht." />
            {errors.message ? <span className="err">{errors.message}</span> : null}
          </div>
          <div className="form-foot">
            <div className="form-status">
              {status === 'sending' ? 'sende…' : status === 'sent' ? '✓ danke — ich melde mich innerhalb von ein, zwei tagen.' : ''}
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'sende…' : 'senden →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/kontakt/page.tsx
git commit -m "feat: add /kontakt page"
```

---

### Task 12: Delete `src/pages/pages.jsx`

**Files:**
- Delete: `src/pages/pages.jsx`

All content has been migrated. This file is no longer imported by anything.

- [ ] **Step 1: Delete**

```bash
git rm src/pages/pages.jsx
```

- [ ] **Step 2: Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove pages.jsx (superseded by app router pages)"
```
