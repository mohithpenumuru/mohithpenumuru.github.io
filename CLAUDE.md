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
- `src/components/ui/` — Reusable primitives: `SectionHeader`, `StatusPill`, `MetricBadge`, `BentoTile`, `RadialOrbital`, plus interaction/FX primitives: `TiltCard` (3D tilt + spotlight), `Magnetic` (cursor-attracted buttons), `Particles` (canvas constellation), `Marquee`, `Counter` (count-up stats), `ScrollProgress`, `CursorGlow`, `IntroCurtain` (page-load reveal), `BackToTop`, and `spotlight.js` (shared mousemove handler feeding `--mx`/`--my` CSS vars consumed by `.spotlight-card` in index.css)

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

## docs/

`docs/superpowers/` holds the redesign plan and design spec (`2026-04-20-portfolio-million-dollar-redesign`). Reference material only — not part of the build.

## Known issue: Contact.jsx vs Windows Defender

Windows Defender flags the content of `src/components/Contact.jsx` as `Trojan:HTML/FakeLogin.AK!atmn` (a phishing-page heuristic falsely matching the contact form markup) and silently deletes the file — including on a fresh `git clone`, leaving the file missing and the working tree dirty. Since `App.jsx` imports it, the build then fails.

If `Contact.jsx` is missing on a Windows machine: don't just `git checkout` it (Defender deletes it again). Either add a Defender exclusion for the repo folder, or restore the file from quarantine. Dumping the file's content to disk in any form (even `.txt`) triggers the same detection. The contact form submits via Web3Forms; the access key constant lives at the top of `Contact.jsx`.
