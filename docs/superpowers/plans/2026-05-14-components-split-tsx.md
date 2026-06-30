# Components Split to TSX — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `src/components/components.jsx` into 6 focused `.tsx` files organized by concern, using ES modules with proper `'use client'` directives.

**Architecture:** Each component becomes a default export in its own `.tsx` file. Components that use hooks or event handlers get `'use client'`; pure render components are Server Components by default. `Nav` imports `PixelAvatar` from the pixel group. `src/pages/pages.jsx` gets ES module imports replacing its window-globals dependency.

**Tech Stack:** React 19, TypeScript 5, Next.js 16 App Router

---

## File Map

| File | Action | Notes |
|------|--------|-------|
| `src/components/pixel/PixelAvatar.tsx` | Create | Server Component — no hooks, no events |
| `src/components/pixel/PixelSprite.tsx` | Create | Server Component — no hooks, no events |
| `src/components/layout/Divider.tsx` | Create | Server Component — no hooks, no events |
| `src/components/layout/Footer.tsx` | Create | `'use client'` — has `onClick` handlers |
| `src/components/layout/Nav.tsx` | Create | `'use client'` — `useState` + `onClick` |
| `src/components/LoadingScreen.tsx` | Create | `'use client'` — `useState` + `useEffect` |
| `src/components/components.jsx` | Delete | Replaced by the six files above |
| `src/pages/pages.jsx` | Modify | Replace window-globals with ES imports |
| `CLAUDE.md` | Modify | Document component grouping convention |

---

### Task 1: Create `src/components/pixel/PixelAvatar.tsx`

**Files:**
- Create: `src/components/pixel/PixelAvatar.tsx`

- [ ] **Step 1: Create the file**

```tsx
type PixelAvatarProps = { size?: number };

const grid = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,1,1,1,1,0,0,
  0,0,3,3,3,3,3,0,
  0,3,3,3,3,3,3,3,
  0,3,3,3,3,3,3,3,
];

const colors: Record<number, string> = {
  0: 'transparent',
  1: '#E2C7A8',
  2: '#3A3E6A',
  3: '#7B6CF6',
};

export default function PixelAvatar({ size = 24 }: PixelAvatarProps) {
  const px = size / 8;
  return (
    <div style={{
      width: size, height: size,
      display: 'grid',
      gridTemplateColumns: `repeat(8, ${px}px)`,
      gridTemplateRows: `repeat(8, ${px}px)`,
      background: '#0D0E1A',
      borderRadius: 2,
      overflow: 'hidden',
      imageRendering: 'pixelated',
      flex: '0 0 auto',
    }}>
      {grid.map((c, i) => (
        <span key={i} style={{ background: colors[c], width: px, height: px, display: 'block' }} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors for this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/pixel/PixelAvatar.tsx
git commit -m "feat: add PixelAvatar TSX component"
```

---

### Task 2: Create `src/components/pixel/PixelSprite.tsx`

**Files:**
- Create: `src/components/pixel/PixelSprite.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React from 'react';

type PixelSpriteProps = { size?: number; label?: string; style?: React.CSSProperties };

export default function PixelSprite({ size = 32, label, style = {} }: PixelSpriteProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div className={`pixel-sprite s${size}`} />
      {label ? <div className="pixel-sprite-label">{label}</div> : null}
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
git add src/components/pixel/PixelSprite.tsx
git commit -m "feat: add PixelSprite TSX component"
```

---

### Task 3: Create `src/components/layout/Divider.tsx`

**Files:**
- Create: `src/components/layout/Divider.tsx`

- [ ] **Step 1: Create the file**

```tsx
export default function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <div className="dots">
        <span className="dot d1" />
        <span className="dot d2" />
        <span className="dot d3" />
        <span className="dot d4" />
        <span className="dot d5" />
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
git add src/components/layout/Divider.tsx
git commit -m "feat: add Divider TSX component"
```

---

### Task 4: Create `src/components/layout/Footer.tsx`

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create the file**

`'use client'` is required because of the `onClick` handlers on anchor tags.

```tsx
'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© 2026 Roman Schulz · Hemer · handgeschrieben, nicht generiert</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="mailto:kontakt@romanschulz.com">e-mail</a>
          <a href="#" onClick={(e) => e.preventDefault()}>linkedin</a>
          <a href="#" onClick={(e) => e.preventDefault()}>impressum</a>
        </div>
      </div>
    </footer>
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
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer TSX component"
```

---

### Task 5: Create `src/components/layout/Nav.tsx`

**Files:**
- Create: `src/components/layout/Nav.tsx`
- Depends on: `src/components/pixel/PixelAvatar.tsx` (Task 1 must be complete)

- [ ] **Step 1: Create the file**

`'use client'` is required because of `useState` and `onClick` handlers.

```tsx
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "feat: add Nav TSX component"
```

---

### Task 6: Create `src/components/LoadingScreen.tsx`

**Files:**
- Create: `src/components/LoadingScreen.tsx`

- [ ] **Step 1: Create the file**

`'use client'` is required because of `useState` and `useEffect`.

```tsx
'use client';

import { useState, useEffect } from 'react';

type LoadingScreenProps = { onDone: () => void };

const poseA = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,3,3,3,3,0,0,
  0,3,3,3,3,3,3,0,
  0,3,0,3,3,0,3,0,
  0,3,0,0,0,0,3,0,
];

const poseB = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,3,3,3,3,0,0,
  0,3,3,3,3,3,3,0,
  0,0,3,3,3,3,0,0,
  0,3,3,0,0,3,3,0,
];

const colors: Record<number, string> = {
  0: 'transparent',
  1: '#E2C7A8',
  2: '#3A3E6A',
  3: '#4ECBA0',
};

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [gone, setGone] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % 8), 100);
    const t = setTimeout(() => {
      setGone(true);
      setTimeout(onDone, 320);
    }, 1500);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);

  const grid = frame % 2 === 0 ? poseA : poseB;

  return (
    <div className={`loader ${gone ? 'gone' : ''}`}>
      <div className="loader-track">
        <div className="loader-ground" />
        <div className="loader-char">
          <div className="frame" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 4px)',
            gridTemplateRows: 'repeat(8, 4px)',
          }}>
            {grid.map((c, i) => (
              <span key={i} style={{ background: colors[c], width: 4, height: 4 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="loader-text">lade<span className="loader-dots" /></div>
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
git add src/components/LoadingScreen.tsx
git commit -m "feat: add LoadingScreen TSX component"
```

---

### Task 7: Update `src/pages/pages.jsx` to use ES imports

**Files:**
- Modify: `src/pages/pages.jsx`

Remove the window-globals pattern and add proper ES module imports. Keep the file as `.jsx` (TSX conversion is a separate task).

- [ ] **Step 1: Replace the top of the file**

Replace this:
```js
// Home, Projects, Blog, Contact — content adapted to Roman Schulz's CV (DE)

const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;
```

With this:
```js
// Home, Projects, Blog, Contact — content adapted to Roman Schulz's CV (DE)

import { useState as useStateP, useEffect as useEffectP, useRef as useRefP } from 'react';
import PixelSprite from '../components/pixel/PixelSprite';
import Divider from '../components/layout/Divider';
```

- [ ] **Step 2: Replace the bottom of the file**

Remove this line at the end of the file:
```js
Object.assign(window, { HomePage, ProjectsPage, BlogPage, ContactPage, ProjectCard });
```

Replace with named exports so consumers can import what they need:
```js
export { HomePage, ProjectsPage, BlogPage, ContactPage, ProjectCard };
```

- [ ] **Step 3: Verify the file parses (no TypeScript errors on the JSX)**

```bash
npx tsc --noEmit
```

Expected: no new errors introduced by these changes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/pages.jsx
git commit -m "refactor: replace window globals with ES imports in pages.jsx"
```

---

### Task 8: Delete `src/components/components.jsx`

**Files:**
- Delete: `src/components/components.jsx`

- [ ] **Step 1: Delete the file**

```bash
git rm src/components/components.jsx
```

- [ ] **Step 2: Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If any file still references the deleted file via a global (e.g., `window.PixelAvatar`), it won't show up in tsc — but since `src/pages/pages.jsx` now uses ES imports and `app/` doesn't reference these components yet, there should be nothing left depending on the old file.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove components.jsx (replaced by individual TSX files)"
```

---

### Task 9: Document component structure in `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Append the component convention section**

Add to `CLAUDE.md`:

```markdown
## Component structure

Components live in `src/components/` grouped by concern:

- `pixel/` — self-contained pixel-art sprite components (`PixelAvatar`, `PixelSprite`). No external deps within this group.
- `layout/` — structural chrome components (`Nav`, `Footer`, `Divider`). `Nav` imports from `pixel/`.
- Root of `src/components/` — app-level components that don't fit a group (e.g. `LoadingScreen`).

Each component is a default export in its own `.tsx` file. Add `'use client'` when the component uses hooks or event handlers; omit it otherwise (Server Component by default).
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: document component grouping convention in CLAUDE.md"
```
