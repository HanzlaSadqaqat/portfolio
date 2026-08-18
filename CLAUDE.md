# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via Next.js
npm run start    # Run production build
```

No test suite is configured. There is no separate type-check script — type errors surface via `npm run build`.

After pulling `.env` changes or modifying it, always restart the dev server — Next.js does not hot-reload env vars.

## One-time setup / bootstrap

To seed the database and create the admin user for the first time:

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "x-setup-secret: <SETUP_SECRET from .env>"
```

This is safe to call multiple times — it only inserts where collections are empty.

## Environment variables

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (no `?replicaSet=rs0` — Atlas handles this automatically) |
| `NEXTAUTH_URL` | Base URL for NextAuth callbacks (must match deployment URL in production) |
| `NEXTAUTH_SECRET` | Signs/encrypts JWT session tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used only by `/api/admin/setup` to create the first admin login |
| `SETUP_SECRET` | Header value required to call `/api/admin/setup` |
| `RESEND_API_KEY` | Optional — enables contact form email notifications |

## Architecture

### Data flow

The public site (`app/page.tsx`) is a **server component** with `export const dynamic = "force-dynamic"`. It calls `lib/db-queries.ts` which wraps every MongoDB query in a `safe()` helper — if the DB is unreachable it silently falls back to the static defaults in `lib/data.ts`, so the site never hard-crashes.

```
app/page.tsx  →  lib/db-queries.ts  →  Mongoose models  →  MongoDB Atlas
                                    ↘  lib/data.ts (fallback)
```

### MongoDB connection

`lib/mongoose.ts` uses a global `_mongoose` cache (`global._mongoose`) to reuse connections across hot-reloads in dev and across serverless invocations. It has a 5 s `serverSelectionTimeoutMS` so connection failures are fast. A failed promise is cleared so the next request retries.

### Theme system

Dark mode is driven by the `.dark` class on `<html>`. All colors are defined as **RGB channel CSS variables** (e.g. `--bg: 255 255 255`) in `globals.css` so Tailwind opacity modifiers (`bg-bg/90`) work. Never use hardcoded color classes like `bg-white` or `text-gray-900` — use the semantic tokens (`bg-bg`, `bg-bg-card`, `text-text-primary`, etc.).

An anti-FOUC inline `<script>` in `app/layout.tsx` sets the `.dark` class synchronously before hydration. `ThemeProvider.tsx` reads `localStorage` on mount and exposes `{ theme, toggle }` via `useTheme()`.

### Admin panel

Route: `/admin` — protected by NextAuth JWT session (CredentialsProvider, `lib/auth.ts`).

Most admin pages are thin wrappers around the reusable `EntityManager` component (`components/admin/EntityManager.tsx`), which handles list/add/edit/delete against any REST API base path. Field types: `text`, `textarea`, `tags` (comma-separated → string[]), `lines` (newline-separated → string[]), `select`, `url`.

Admin API routes all follow the same pattern:
- `GET /api/<resource>` — public read
- `POST /api/<resource>` — create (session required)
- `PUT /api/<resource>/[id]` — update (session required)
- `DELETE /api/<resource>/[id]` — delete (session required)
- `Profile` and `About` are singletons (no `[id]` routes, use `findOneAndUpdate` with upsert).

### Animations

All animations use **Framer Motion**. Key patterns:
- `components/ui/AnimationWrappers.tsx` — reusable `FadeUp`, `SlideInLeft`, `SlideInRight`, `StaggerGrid` + `StaggerItem`, `WordReveal`
- Hero uses `useScroll` + `useTransform` + `useSpring` for scroll-driven parallax
- Navbar has a scroll progress bar via `useSpring(scrollYProgress)`
- Infinite marquee in `MarqueeBanner.tsx` doubles the items array and animates `x: ["0%", "-50%"]` for a seamless loop
- Use `viewport: { once: true, margin: "-80px" }` on all `whileInView` animations

### Video / showreel

`profile.videoUrl` (optional field in DB) controls the showreel feature. When set:
- A "Watch Showreel" button appears in the Hero
- The video auto-plays 2 s after page load, guarded by `sessionStorage.getItem("videoPlayed")` so it only fires once per session
- `VideoModal.tsx` parses YouTube URLs (all formats) and uses the embed API; falls back to a `<video>` tag for direct video URLs
- Configured via `/admin/profile` → "Showreel / Video" field

### Sections

All portfolio sections are in `components/sections/`. Each receives its data as props from the server component in `app/page.tsx` — none fetch data themselves. Order on the page: `Navbar → Hero → MarqueeBanner → About → Projects → Automations → Blog → Resume → Contact → Footer`.
