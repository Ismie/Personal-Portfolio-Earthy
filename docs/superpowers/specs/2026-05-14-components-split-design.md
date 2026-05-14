# Design: Split & convert components.jsx to TSX

**Date:** 2026-05-14

## Goal

Split `src/components/components.jsx` into individual TypeScript React files (`.tsx`), using ES modules instead of the current browser-globals pattern.

## File structure

```
src/components/
  pixel/
    PixelAvatar.tsx
    PixelSprite.tsx
  layout/
    Divider.tsx
    Nav.tsx
    Footer.tsx
  LoadingScreen.tsx
```

- `pixel/` — self-contained pixel-art sprite components, no external deps
- `layout/` — structural UI components; `Nav` imports `PixelAvatar`
- `LoadingScreen.tsx` — app-level concern, lives at `components/` root

## TypeScript interfaces

Inline props types per file (no shared types file):

```ts
type PixelAvatarProps   = { size?: number }
type PixelSpriteProps   = { size?: number; label?: string; style?: React.CSSProperties }
type NavProps           = { route: string; setRoute: (route: string) => void }
type LoadingScreenProps = { onDone: () => void }
// Divider, Footer — no props
```

`route` is typed as `string` for now; can be narrowed to a union once pages are typed.

## Migration changes

1. Replace `const { useState, useEffect, useRef } = React` with named imports from `'react'`
2. Replace `Object.assign(window, {...})` with `export default` per component file
3. Update `src/pages/pages.jsx` to import shared components from their new paths so globals are no longer needed

## CLAUDE.md documentation

Add a section to `CLAUDE.md` describing the component grouping convention so future additions follow the same structure.

## Out of scope

- Converting `src/pages/pages.jsx` to TSX (separate task)
- Adding a barrel `index.ts`
- Narrowing the `route` type to a union
