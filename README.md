# Terminal Portfolio — Next.js

A dark, terminal-inspired portfolio for **MERN stack & AI automation engineers**. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🖤 **Terminal aesthetic** — command-line prompts, monospace, subtle grid background
- ⌨️ **Typing animation** in the hero
- 📦 **Projects showcase** with status badges (live / beta / wip)
- 🤖 **AI automation case studies** with problem / solution / impact breakdown
- 📝 **Blog section** ready for your posts
- 📄 **Resume / experience** timeline + downloadable PDF
- ✉️ **Working contact form**, messages saved to MongoDB
- 🛠️ **Admin panel** (`/admin`) — manage every section of the site without touching code
- 🗄️ **MongoDB-backed content** — all sections are editable and persisted in a database
- 🎬 **Smooth scroll** animations via Framer Motion
- 📱 **Fully responsive**, mobile-first
- 🚀 **SEO-ready** with Next.js metadata

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment variables
# Edit .env — set MONGODB_URI, NEXTAUTH_URL/SECRET, ADMIN_EMAIL/PASSWORD, SETUP_SECRET
# (a working .env is generated for you already; just point MONGODB_URI at your DB)

# 3. Run dev server
npm run dev

# 4. Bootstrap the database (creates your admin login + seeds starter content)
#    Run once, from another terminal, using the SETUP_SECRET from .env:
curl -X POST http://localhost:3000/api/admin/setup -H "x-setup-secret: <SETUP_SECRET from .env>"

# Open http://localhost:3000        — public site
# Open http://localhost:3000/admin  — admin panel (log in with ADMIN_EMAIL / ADMIN_PASSWORD)
```

## Admin panel & MongoDB

All content (profile, about, skills, projects, automations, blog, experience, education) is
stored in MongoDB and editable from `/admin`, protected by login (NextAuth credentials auth).

- **Models** live in `models/*.ts` (Mongoose schemas)
- **API routes** for CRUD live in `app/api/*` (each requires a session for writes; GET is public
  where the public site needs it)
- **Admin UI** lives in `app/admin/*`, sharing a reusable `EntityManager` component
  (`components/admin/EntityManager.tsx`) for the list-based sections, plus dedicated forms for
  the single-document sections (profile, about) and contact messages
- `middleware.ts` redirects unauthenticated requests away from `/admin/*` (except the login page)
- The public site (`app/page.tsx`) fetches straight from MongoDB on every request
  (`lib/db-queries.ts`) and **falls back to the starter data in `lib/data.ts`** if the DB is empty
  or briefly unreachable, so the site never breaks
- `lib/data.ts` is now only the **seed/fallback data** — once you're editing through `/admin`,
  you generally won't touch this file again
- Change your admin password any time from `/admin/settings`

### Bootstrapping a fresh database

`/api/admin/setup` is a one-time, secret-protected endpoint: it creates your admin login from
`ADMIN_EMAIL`/`ADMIN_PASSWORD` and seeds any empty collections from `lib/data.ts`. It's safe to
call more than once — it skips anything that already exists. Rotate `SETUP_SECRET` (or remove the
route) once you're done with initial setup.

Your resume PDF goes in `public/resume.pdf` (the download button will pick it up automatically).

## Project structure

```
portfolio/
├── app/
│   ├── admin/                  # Admin panel (protected by middleware.ts)
│   │   ├── login/page.tsx
│   │   ├── profile/, about/, skills/, projects/, automations/,
│   │   │   blog/, experience/, education/, messages/, settings/
│   │   └── page.tsx             # Dashboard
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth (admin login)
│   │   ├── admin/setup/route.ts          # One-time DB bootstrap
│   │   ├── admin/change-password/route.ts
│   │   ├── contact/route.ts              # Contact form → MongoDB
│   │   ├── profile/, about/, skills/, projects/, automations/,
│   │   │   blog/, experience/, education/, messages/   # CRUD APIs
│   │   └── seed/route.ts                 # Reset content to lib/data.ts defaults
│   ├── globals.css             # Theme + base styles
│   ├── layout.tsx              # Metadata (pulled from DB), fonts
│   └── page.tsx                # Fetches content from MongoDB, composes sections
├── components/
│   ├── admin/                  # Admin-only UI kit, EntityManager, shell
│   ├── Navbar.tsx
│   ├── Hero.tsx                # Typing animation
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Automations.tsx         # AI case studies
│   ├── Blog.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx             # Form + socials
│   ├── Footer.tsx
│   ├── TerminalWindow.tsx      # Reusable mac-style window
│   └── TypingText.tsx
├── models/                     # Mongoose schemas (Profile, Project, etc.)
├── lib/
│   ├── mongoose.ts             # DB connection
│   ├── auth.ts                 # NextAuth config
│   ├── db-queries.ts           # Server-side reads with fallback to lib/data.ts
│   └── data.ts                 # Seed/fallback content (no longer the source of truth)
├── middleware.ts                # Protects /admin/*
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Wire up the contact form

Open `app/api/contact/route.ts`. Right now it just logs to the console. To actually receive emails, pick one:

### Option A — Resend (simplest)
```bash
npm install resend
```
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'portfolio@yourdomain.com',
  to: 'you@example.com',
  subject: `New message from ${name}`,
  text: `${message}\n\nFrom: ${name} <${email}>`,
});
```
Add `RESEND_API_KEY=...` to `.env.local`.

### Option B — Web3Forms / Formspree
No backend code needed. Get an endpoint, then change `fetch("/api/contact", ...)` in `components/Contact.tsx` to point at it.

## Deploy

The fastest path is **Vercel** (the company behind Next.js):

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add any env vars (`RESEND_API_KEY`, etc.)
4. Done — you get a `yourname.vercel.app` URL instantly

Also deploys cleanly to Netlify, Cloudflare Pages, or self-hosted with `npm run build && npm start`.

## Tweaking the theme

Colors live in `tailwind.config.ts`. The defaults:

| Token             | Hex       | Used for                  |
| ----------------- | --------- | ------------------------- |
| `bg.DEFAULT`      | `#0a0a0a` | Page background           |
| `bg.soft`         | `#111114` | Cards, raised surfaces    |
| `accent.green`    | `#22c55e` | Primary terminal accent   |
| `accent.cyan`     | `#06b6d4` | Tech tags, secondary text |
| `accent.yellow`   | `#fbbf24` | Beta status, highlights   |

Change `accent.green` to `#00ff9f` for a more matrix-y look, or to `#ff7043` for a warmer hacker vibe.

## License

Yours. Ship it.
