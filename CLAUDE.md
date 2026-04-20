# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Mohith Penumuru (AI & Data Engineer). Built with React + Vite + Tailwind CSS. Dark-themed with glassmorphism, gradient mesh backgrounds, and framer-motion animations.

## Commands

- `npm run dev` — Start dev server (Vite)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Architecture

Single-page React app (no router). All content is in section components rendered sequentially in `src/App.jsx`. No state management library — component-local state only.

**Key files:**
- `src/App.jsx` — Root layout with gradient mesh background blobs and section ordering
- `src/index.css` — Global styles: glassmorphism (`.glass`), animations (`meshFloat`, `aurora`, `orbFloat`), custom scrollbar, noise texture overlay, utility classes (`.section-pad`, `.glow`, `.skill-card`, `.project-glow`)
- `tailwind.config.js` — Custom colors (`accent`, `violet`, `surface`, `ink` scale), fonts (`display`=Instrument Serif, `body`=Inter, `mono`=JetBrains Mono)
- `src/components/ui/` — Reusable primitives: `SectionHeader`, `StatusPill`, `MetricBadge`, `BentoTile`, `RadialOrbital`

**Section components** in `src/components/`: Navbar, Hero, About, Experience, Skills, Certifications, Projects, Publication, Contact, Footer.

## Design System

- Background: `surface` (#06060a), with two violet/cyan gradient mesh blobs
- Accent colors: `violet` (#8b5cf6), `accent` (#22d3ee)
- Ink scale: `ink` #fafafa / `ink-muted` #94a3b8 / `ink-dim` #737373 / `ink-faint` #404040
- Typography: `font-display` (Instrument Serif, italic accents) for headlines, `font-body` (Inter) for prose, `font-mono` (JetBrains Mono) for labels and metadata
- Cards use `.glass` (backdrop-blur + translucent dark bg) and `.glass-hover` for lift effects
- Icons from `lucide-react`; animations via `framer-motion`

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Pushes to `main` trigger build and deploy. `vite.config.js` sets `base: '/'`.

## ext_components/

Contains `.txt` files with reference UI component code (from external libraries like Aceternity UI). These are design references, not imported into the build.
