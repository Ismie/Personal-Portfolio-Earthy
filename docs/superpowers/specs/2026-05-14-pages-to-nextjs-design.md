# Design: Wire pages.jsx into Next.js App Router

**Date:** 2026-05-14

## Goal

Convert `src/pages/pages.jsx` into proper Next.js App Router pages with file-based routing, a shared layout shell (Nav + Footer), and a `LoadingScreen` overlay on every route change (minimum 200ms).

## Routes

| URL | Component | Boundary |
|-----|-----------|----------|
| `/` | HomePage | Server Component |
| `/projekte` | ProjectsPage | Server Component |
| `/blog` | BlogPage | `'use client'` (onClick on placeholder links) |
| `/kontakt` | ContactPage | `'use client'` (form state) |

## File Map

### New / replaced files

| File | Action | Notes |
|------|--------|-------|
| `app/layout.tsx` | Update | Add Nav, Footer, PageTransition; `lang="de"` |
| `app/page.tsx` | Replace | HomePage — Server Component |
| `app/projekte/page.tsx` | Create | ProjectsPage — Server Component |
| `app/blog/page.tsx` | Create | BlogPage — `'use client'` |
| `app/kontakt/page.tsx` | Create | ContactPage — `'use client'` |
| `src/components/TypewriterRole.tsx` | Create | `'use client'` — useState + useEffect |
| `src/components/ProjectCard.tsx` | Create | `'use client'` — onClick handler |
| `src/components/layout/PageTransition.tsx` | Create | `'use client'` — pathname watcher |
| `src/components/LoadingScreen.tsx` | Update | Add `duration` prop (default 1500) |
| `src/components/layout/Nav.tsx` | Update | next/link + usePathname; drop route/setRoute props |
| `src/data/projects.ts` | Create | `projectsAll` array (shared by `/` and `/projekte`) |
| `src/pages/pages.jsx` | Delete | Fully superseded |

### Unchanged

`src/components/pixel/`, `src/components/layout/Divider.tsx`, `src/components/layout/Footer.tsx`, `app/globals.css`

## Architecture

### Layout shell (`app/layout.tsx`)

```tsx
<html lang="de">
  <body>
    <Nav />
    <PageTransition>
      <main>{children}</main>
    </PageTransition>
    <Footer />
  </body>
</html>
```

Nav and Footer render on every page. PageTransition wraps `children` and overlays LoadingScreen on route changes.

### Routing & Nav

`Nav` drops `route`/`setRoute` props. Active link state uses `usePathname()`. Navigation uses `<Link>` from `next/navigation`. `window.scrollTo` is removed — App Router scrolls to top by default. Burger menu calls `setOpen(false)` in each Link's `onClick`.

Pages array:
```ts
{ href: '/',         label: '~/start'    }
{ href: '/projekte', label: '~/projekte' }
{ href: '/blog',     label: '~/blog'     }
{ href: '/kontakt',  label: '~/kontakt'  }
```

### PageTransition

`'use client'` component. Uses `useRef` to track the previous pathname so the loading screen does not appear on initial load — only on subsequent navigations.

```tsx
// On pathname change: show <LoadingScreen duration={400} onDone={() => setLoading(false)} />
// Renders LoadingScreen on top of children; new page loads beneath it
// When onDone fires: loading state clears, overlay disappears
```

Duration `400ms` satisfies the ≥200ms requirement while keeping transitions snappy.

### LoadingScreen changes

Add optional `duration` prop (milliseconds, default `1500`). Replaces the hardcoded `1500` main timer with `duration`. The 320ms fade-out stays fixed — it is a CSS transition constant, not a loading time.

### Data

`src/data/projects.ts` exports `projectsAll` as a typed array. Used by `app/page.tsx` (first 3 items) and `app/projekte/page.tsx` (all items).

`experience` and `skills` stay inline in `app/page.tsx` (only used there).  
`featuredPost` and `recentPosts` stay inline in `app/blog/page.tsx` (only used there).

### HomePage CTA buttons

`setRoute('projects')` → `<Link href="/projekte" className="btn btn-primary">projekte ansehen →</Link>`  
`setRoute('contact')` → `<Link href="/kontakt" className="btn btn-ghost">kontakt aufnehmen</Link>`

No `useRouter` needed — `app/page.tsx` stays a Server Component.

## Out of scope

- CSS for component classes (`.nav`, `.footer`, `.loader`, etc.) — separate task
- TypeScript conversion of `app/blog/page.tsx` data (stays as JS-style inline objects but typed)
- Blog/project detail pages (routes don't exist yet)
- Contact form actual submission (currently a simulated timeout)
