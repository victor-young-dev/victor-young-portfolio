# Victor Young — Portfolio

Personal portfolio + RayzorVerse ecosystem site. Product builder, designer,
and developer based in Nigeria.

## Stack

TanStack Start (React 19, file-based routing) on Vite, styled with Tailwind
CSS v4. Motion via `motion` (Framer Motion's successor), a WebGL hero scene
via `@react-three/fiber`, and a playable low-poly maze in the Lab.

- **Type:** Instrument Serif (display), Outfit (body), IBM Plex Mono (labels) via Google Fonts
- **Themes:** light and dark, toggled in the nav, remembered in `localStorage`, defaults to dark
- **Motion:** scroll reveals, split-word headline animation, magnetic buttons, a custom cursor — all disabled under `prefers-reduced-motion`

## Structure

```
src/
├── routes/            file-based routes (/, /work, /work/$slug, /ventures,
│                       /services, /lab, /lab/maze, /about, /contact)
├── components/site/    nav, footer, page shell, cursor, reveals, hero canvas
├── components/maze/    the Lab's playable maze
├── components/ui/      shared primitives (button, etc.)
└── lib/site.ts         all site copy and content — the single source of truth
```

Edit `src/lib/site.ts` to change copy, add work, or update proof points —
almost nothing else needs to change.

## Run it locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```
