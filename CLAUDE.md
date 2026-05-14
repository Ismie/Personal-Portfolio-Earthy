@AGENTS.md

## Component structure

Components live in `src/components/` grouped by concern:

- `pixel/` — self-contained pixel-art sprite components (`PixelAvatar`, `PixelSprite`). No external deps within this group.
- `layout/` — structural chrome components (`Nav`, `Footer`, `Divider`). `Nav` imports from `pixel/`.
- Root of `src/components/` — app-level components that don't fit a group (e.g. `LoadingScreen`).

Each component is a default export in its own `.tsx` file. Add `'use client'` when the component uses hooks or event handlers; omit it otherwise (Server Component by default).
