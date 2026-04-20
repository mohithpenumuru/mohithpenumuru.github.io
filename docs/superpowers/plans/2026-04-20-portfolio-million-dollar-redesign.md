# Portfolio "Million-Dollar" Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio from "polished personal site" to AI-native enterprise-grade presence: editorial typography (Instrument Serif + Inter + JetBrains Mono), a signature radial-orbital "AI brain" hero, numbered section headers, bento skills grid, headline metrics on projects, corrected Deloitte experience, and a consolidated Contact section.

**Architecture:** Pure refactor of an existing React + Vite + Tailwind SPA. No new dependencies. Foundation tokens (fonts, colors, motion) change first; reusable UI primitives are introduced under `src/components/ui/`; section components are then refactored one at a time so each commit leaves the site in a working state.

**Tech Stack:** React 18, Vite 6, Tailwind CSS 3, framer-motion, lucide-react. No test runner is configured — verification is `npm run build` (must succeed with zero errors) plus visual inspection in `npm run dev` at three breakpoints (375 / 768 / 1280 px).

**Reference spec:** [`docs/superpowers/specs/2026-04-20-portfolio-million-dollar-redesign-design.md`](../specs/2026-04-20-portfolio-million-dollar-redesign-design.md)

---

## Verification Convention (project has no test runner)

Every task ends with the same verification gate before commit:

1. `npm run build` — must complete with **0 errors**.
2. `npm run dev` — load `http://localhost:5173/`, verify the **acceptance checks** listed in the task at desktop width (≥1280px). For tasks that touch layout, also resize to **375px** (mobile) and **768px** (tablet) and confirm no horizontal scroll, no overlapping elements, no broken text wrapping.
3. Visual diff against the spec section being implemented — re-read the matching `§` of the spec and confirm each bullet is reflected.

**Commit format:** Conventional commits (`feat:`, `refactor:`, `chore:`, `style:`).

---

## File Structure

### Created

| Path | Responsibility |
|---|---|
| `src/components/ui/SectionHeader.jsx` | Numbered editorial section header. Props: `number`, `title`, `italicWord`, `subtitle?`. Renders mono `01 —` + serif title with optional italic accent on one word. Used by every section. |
| `src/components/ui/StatusPill.jsx` | Glass pill with green dot + label. Props: `label`. Used in Hero. |
| `src/components/ui/MetricBadge.jsx` | Large mono metric block. Props: `value`, `label`. Used in Projects (one per card). |
| `src/components/ui/BentoTile.jsx` | Variable-size glass tile with hover lift. Props: `span` (`'1x1' \| '2x1' \| '2x2'`), `label`, `accent` (`'violet' \| 'cyan'`), `featured?`, `children`. Used in Skills. |
| `src/components/ui/RadialOrbital.jsx` | Self-contained CSS/SVG orbital animation. Props: `size`, `nodes` (array of `{label, ringIndex, angle}`), `caption?`, `intensity` (`'full' \| 'subtle'`). Used in Hero (full) and About (subtle, behind avatar). |

### Modified

| Path | Change summary |
|---|---|
| `index.html` | Swap Google Fonts link from Syne+Manrope to Instrument Serif + Inter + JetBrains Mono. |
| `tailwind.config.js` | Replace fonts (`display`, `body`, `mono`); add `ink` color tokens; tweak `surface`/`accent` values. |
| `src/index.css` | Update `body` font, `surface` background color, `.glass` (12px blur, neutral border), `.section-divider` (halve opacity), `.section-pad` (py-32 md:py-40), remove unused keyframes. |
| `src/App.jsx` | Reduce mesh blobs from 4 to 2; remove `CTA` import + render. |
| `src/components/Navbar.jsx` | Italic-serif `MP*.*` logo; numbered mono nav links (`01 — About`); refined Resume button. |
| `src/components/Hero.jsx` | Full restructure — `RadialOrbital` centerpiece + radial-gradient backdrop, Instrument Serif headline with italic "AI-native" accent, refined sub, `StatusPill`, restyled `TypingRotator`, refined badges/CTAs. |
| `src/components/About.jsx` | Replace heading with `SectionHeader`, wrap MP monogram in `RadialOrbital intensity="subtle"`, rewrite bio (2 paragraphs with italic accents), refine quick-fact pills typography. |
| `src/components/Experience.jsx` | Replace heading with `SectionHeader`, fix Deloitte duration to `Sep 2025 — Present`, append two new bullets (MCP marketplace + multi-agent orchestration), violet-only progress line, mono date stamps, typography pass. |
| `src/components/Skills.jsx` | Replace heading with `SectionHeader`, rebuild grid as bento layout using `BentoTile`. AI tile = 2x2 featured with subtle orbital echo; Big Data + Cloud Platforms = 2x1; rest = 1x1. |
| `src/components/Certifications.jsx` | Replace heading with `SectionHeader`, add summary line above grid, refine cards (softer chip, smaller icon, tighter type). |
| `src/components/Projects.jsx` | Replace heading with `SectionHeader`, add `MetricBadge` to each card top-left replacing the bare `01/02` numeral, refined chevron arrows, typography pass. |
| `src/components/Publication.jsx` | Replace heading with `SectionHeader`, add `01` numeral matching project pattern, serif treatment for paper title, mono metadata. |
| `src/components/Contact.jsx` | Replace heading with `SectionHeader` (italic on "build"), absorb terminal block from CTA into right column, refined Send button (mono label, violet gradient). |
| `src/components/Footer.jsx` | Inter typography, `MP*.*` logo italic to match Navbar. |

### Deleted

| Path | Reason |
|---|---|
| `src/components/CTA.jsx` | Section removed; terminal block migrated into `Contact.jsx`. |

### Unchanged

`vite.config.js`, `package.json`, `.github/workflows/deploy.yml`, `public/`, `postcss.config.js`, `src/main.jsx`.

---

## Phase 1 — Foundation (typography, color, motion tokens)

These tasks must land first because every later task references them.

### Task 1: Swap Google Fonts in `index.html`

**Files:**
- Modify: `index.html:11`

- [ ] **Step 1: Replace the Google Fonts `<link>`**

In `index.html`, replace line 11:

```html
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

with:

```html
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds, 0 errors.

Run: `npm run dev`, open `http://localhost:5173/`, open DevTools Network tab, reload, confirm one request to `fonts.googleapis.com/css2?family=Instrument+Serif…` returns 200 and **no** request for Syne or Manrope is made.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "chore: swap Google Fonts to Instrument Serif + Inter + JetBrains Mono"
```

---

### Task 2: Update Tailwind theme (fonts + color tokens)

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Rewrite `tailwind.config.js`**

Overwrite the file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#22d3ee',
        violet: '#8b5cf6',
        surface: {
          DEFAULT: '#06060a',
          light: '#0c0c12',
          lighter: '#14141c',
        },
        ink: {
          DEFAULT: '#fafafa',
          muted: '#94a3b8',
          dim: '#737373',
          faint: '#404040',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds. (Pages will look broken — `font-heading`, `font-body`, `font-mono` references using old names will fall back to browser defaults until Task 3 is done. That's expected.)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: introduce display/body/mono font tokens and ink color scale"
```

---

### Task 3: Update global CSS (body font, surface bg, glass, divider, section-pad)

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update `@layer base` body styles**

Replace lines 16-21 of `src/index.css`:

```css
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #06060a;
    color: #fafafa;
    overflow-x: hidden;
  }
```

- [ ] **Step 2: Update scrollbar track color**

Replace line 30:

```css
::-webkit-scrollbar-track { background: #06060a; }
```

- [ ] **Step 3: Update `.glass` to refined values**

Replace lines 107-113:

```css
.glass {
  background: rgba(8, 8, 24, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}
```

- [ ] **Step 4: Halve divider opacity**

Replace lines 133-136:

```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.075), rgba(34, 211, 238, 0.05), transparent);
}
```

- [ ] **Step 5: Increase section padding**

Replace lines 271-275 (the `@layer components` block):

```css
@layer components {
  .section-pad {
    @apply px-6 py-32 md:px-12 md:py-40 lg:px-24 xl:px-32;
  }
}
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: success.

Run: `npm run dev`, load the page. Body text should now render in **Inter** (rounded sans). The page background should be visibly slightly warmer (#06060a vs #030014). Glass cards should be less frosted. Section dividers should be barely visible.

- [ ] **Step 7: Commit**

```bash
git add src/index.css
git commit -m "refactor(css): apply Inter base, refined glass, calmer divider, deeper section padding"
```

---

### Task 4: Reduce mesh blobs in `App.jsx` (4 → 2)

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace the four `<div className="mesh-blob">` blocks with two**

In `src/App.jsx`, replace lines 17-61 (the entire `<div className="mesh-gradient">…</div>` element) with:

```jsx
      <div className="mesh-gradient">
        <div
          className="mesh-blob"
          style={{
            width: 900,
            height: 900,
            top: '-10%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)',
            animationDuration: '35s',
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: 700,
            height: 700,
            bottom: '-5%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.13), transparent 70%)',
            animationDuration: '35s',
            animationDelay: '12s',
          }}
        />
      </div>
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.
Run: `npm run dev` — page background shows two large slow-drifting blobs (one violet upper-left, one cyan lower-right) instead of four. No JavaScript console errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: reduce hero mesh blobs to 2 (calmer background)"
```

---

## Phase 2 — Reusable UI primitives

Build these in `src/components/ui/` before any consumer refactors. Each is consumed by multiple sections; getting them right once avoids touching them later.

### Task 5: Create `SectionHeader` primitive

**Files:**
- Create: `src/components/ui/SectionHeader.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ui/SectionHeader.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Numbered editorial section header.
 *
 * @param {string} number  Two-digit section index, e.g. "01"
 * @param {string} title   Heading text. The first occurrence of `italicWord` is wrapped in <em>.
 * @param {string} [italicWord]  Word inside `title` to render in italic display serif.
 * @param {string} [subtitle]    Optional one-line subhead in ink.muted.
 */
export default function SectionHeader({ number, title, italicWord, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  let titleNode = title
  if (italicWord && title.includes(italicWord)) {
    const [before, after] = title.split(italicWord)
    titleNode = (
      <>
        {before}
        <em className="font-display italic text-violet">{italicWord}</em>
        {after}
      </>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-14"
    >
      <p className="font-mono text-xs text-violet tracking-[0.35em] mb-4">
        — {number} —
      </p>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight">
        {titleNode}
      </h2>
      {subtitle && (
        <p className="text-ink-muted text-base mt-4 max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

(Component is not yet rendered; visual verification happens when first consumer adopts it in Task 11.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/SectionHeader.jsx
git commit -m "feat(ui): add SectionHeader primitive (numbered serif heading with italic accent)"
```

---

### Task 6: Create `StatusPill` primitive

**Files:**
- Create: `src/components/ui/StatusPill.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ui/StatusPill.jsx`:

```jsx
/**
 * Glass pill with pulsing green dot — used for "Available for…" status.
 *
 * @param {string} label  Text after the dot.
 */
export default function StatusPill({ label }) {
  return (
    <div className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[11px] text-ink-muted tracking-wider">{label}</span>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/StatusPill.jsx
git commit -m "feat(ui): add StatusPill primitive"
```

---

### Task 7: Create `MetricBadge` primitive

**Files:**
- Create: `src/components/ui/MetricBadge.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ui/MetricBadge.jsx`:

```jsx
/**
 * Large mono headline metric used at the top-left of project cards.
 *
 * @param {string} value  Big mono value, e.g. "60% ↓", "3 domains", "100%", "4+ agents".
 * @param {string} label  Small caption under the value, e.g. "runtime reduction".
 */
export default function MetricBadge({ value, label }) {
  return (
    <div>
      <div className="font-mono text-3xl md:text-4xl text-violet font-medium leading-none tracking-tight">
        {value}
      </div>
      <div className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] mt-2">
        {label}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/MetricBadge.jsx
git commit -m "feat(ui): add MetricBadge primitive for project headline metrics"
```

---

### Task 8: Create `BentoTile` primitive

**Files:**
- Create: `src/components/ui/BentoTile.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ui/BentoTile.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SPAN_CLASSES = {
  '1x1': 'md:col-span-1 md:row-span-1',
  '2x1': 'md:col-span-2 md:row-span-1',
  '2x2': 'md:col-span-2 md:row-span-2',
}

const ACCENT_CLASSES = {
  violet: {
    dot: 'bg-violet',
    border: 'hover:border-violet/30',
  },
  cyan: {
    dot: 'bg-accent',
    border: 'hover:border-accent/30',
  },
}

/**
 * Variable-size glass tile for the Skills bento grid.
 *
 * @param {'1x1'|'2x1'|'2x2'} span     Grid span (md+ breakpoints).
 * @param {string}            label    Mono category label.
 * @param {'violet'|'cyan'}   accent   Dot + hover border color.
 * @param {boolean}           [featured]  Adds a subtle orbital echo background.
 * @param {number}            [index]  For stagger animation delay.
 * @param {React.ReactNode}   children Skill chips or arbitrary content.
 */
export default function BentoTile({ span, label, accent, featured, index = 0, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const colors = ACCENT_CLASSES[accent]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-opacity-30 overflow-hidden ${SPAN_CLASSES[span]} ${colors.border}`}
    >
      {featured && (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-violet/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-dashed border-accent/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-violet/20 blur-2xl" />
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          <span className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em]">{label}</span>
        </div>
        {children}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/BentoTile.jsx
git commit -m "feat(ui): add BentoTile primitive (variable-span glass tile with optional orbital echo)"
```

---

### Task 9: Create `RadialOrbital` primitive (the signature element)

**Files:**
- Create: `src/components/ui/RadialOrbital.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ui/RadialOrbital.jsx`:

```jsx
import { motion } from 'framer-motion'
import { useState } from 'react'

const RING_CONFIG = [
  { radius: 140, dashed: false, opacity: 0.25, duration: 60, direction: 1 },
  { radius: 90,  dashed: true,  opacity: 0.3,  duration: 40, direction: -1 },
  { radius: 45,  dashed: false, opacity: 0.4,  duration: 25, direction: 1 },
]

/**
 * The signature radial orbital "AI brain" — concentric rings with a glowing core
 * and orbiting labeled nodes. Pure CSS/SVG + framer-motion. No WebGL.
 *
 * @param {number}                size      Outer diameter in px (default 320).
 * @param {Array<{label: string, ringIndex: 0|1|2, angle: number}>} nodes
 *                                          Labeled orbiting nodes. `angle` in degrees (0 = right, 90 = bottom).
 * @param {string}                [caption] Optional mono caption shown beneath the orbital.
 * @param {'full'|'subtle'}       intensity Visual weight. 'subtle' lowers opacity for echo use.
 */
export default function RadialOrbital({ size = 320, nodes = [], caption, intensity = 'full' }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const opacityMultiplier = intensity === 'subtle' ? 0.35 : 1
  const scale = size / 320

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft radial glow backdrop */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.08) 35%, transparent 70%)',
          opacity: opacityMultiplier,
        }}
      />

      {/* Concentric rings */}
      {RING_CONFIG.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.radius * 2 * scale,
            height: ring.radius * 2 * scale,
            border: ring.dashed
              ? `1px dashed rgba(34,211,238,${ring.opacity * opacityMultiplier})`
              : `1px solid rgba(139,92,246,${ring.opacity * opacityMultiplier})`,
            boxShadow:
              i === 2
                ? `0 0 30px rgba(139,92,246,${0.3 * opacityMultiplier}), inset 0 0 20px rgba(139,92,246,${0.15 * opacityMultiplier})`
                : 'none',
          }}
          animate={{ rotate: ring.direction * 360 }}
          transition={{ duration: ring.duration, ease: 'linear', repeat: Infinity }}
        />
      ))}

      {/* Core orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 36 * scale,
          height: 36 * scale,
          background: 'radial-gradient(circle, #fff 0%, #a78bfa 40%, #8b5cf6 100%)',
          boxShadow: `0 0 30px rgba(139,92,246,${0.8 * opacityMultiplier}), 0 0 60px rgba(34,211,238,${0.4 * opacityMultiplier})`,
        }}
      />

      {/* Orbiting labeled nodes (positioned on their assigned ring) */}
      {nodes.map((node, i) => {
        const ring = RING_CONFIG[node.ringIndex] ?? RING_CONFIG[0]
        const r = ring.radius * scale
        const rad = (node.angle * Math.PI) / 180
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        const isHovered = hoveredNode === i
        return (
          <div
            key={node.label}
            className="absolute"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <button
              type="button"
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              className="relative -translate-x-1/2 -translate-y-1/2 group"
              aria-label={node.label}
            >
              <span
                className="block w-2.5 h-2.5 rounded-full bg-accent"
                style={{
                  boxShadow: `0 0 12px rgba(34,211,238,${0.8 * opacityMultiplier})`,
                  opacity: opacityMultiplier,
                }}
              />
              {intensity === 'full' && (
                <span
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-wider uppercase text-accent transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {node.label}
                </span>
              )}
            </button>
          </div>
        )
      })}

      {/* Optional caption beneath the orbital */}
      {caption && intensity === 'full' && (
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] text-violet/70 tracking-[0.25em] uppercase whitespace-nowrap"
          style={{ top: `calc(100% + 1.5rem)` }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

(Visual verification happens in Task 11 when Hero adopts it.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/RadialOrbital.jsx
git commit -m "feat(ui): add RadialOrbital — signature concentric-rings AI-brain animation"
```

---

## Phase 3 — Section refactors

Order: Navbar first (visible on every scroll), then sections top-to-bottom of the page so visual review is sequential. Each task ends with a working site.

### Task 10: Refactor `Navbar` (italic logo + numbered mono links)

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Update `navLinks` with section numbers**

In `src/components/Navbar.jsx`, replace lines 5-12:

```jsx
const navLinks = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Work', href: '#experience' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'Certs', href: '#certifications' },
  { num: '05', label: 'Projects', href: '#projects' },
  { num: '07', label: 'Contact', href: '#contact' },
]
```

- [ ] **Step 2: Restyle the logo and desktop links**

Replace lines 36-62 (the `<a href="#hero">` logo and the `<div className="hidden md:flex…">` block) with:

```jsx
        <a
          href="#hero"
          className="font-display text-2xl text-ink tracking-tight hover:text-violet transition-colors duration-300"
        >
          MP<em className="not-italic text-violet">.</em>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] text-ink-muted hover:text-ink transition-colors duration-300 tracking-wider"
            >
              <span className="text-violet/70 mr-1.5">{link.num}</span>
              {link.label}
            </a>
          ))}
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-wider px-4 py-2 rounded-full border border-violet/40 text-violet
              hover:bg-violet hover:text-ink transition-all duration-300"
          >
            RESUME
          </a>
        </div>
```

- [ ] **Step 3: Update mobile menu typography**

Replace lines 82-93 (the `<div className="glass mx-4…">` block) with:

```jsx
            <div className="glass mx-4 mt-2 p-6 rounded-2xl flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-ink-muted hover:text-violet transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-violet/70 mr-2">{link.num}</span>
                  {link.label}
                </a>
              ))}
            </div>
```

- [ ] **Step 4: Verify**

Run: `npm run build` — success.
Run: `npm run dev` — Navbar logo renders in Instrument Serif (a thin elegant serif). Desktop links read "01 About", "02 Work", etc., in JetBrains Mono. Resume button is uppercase mono in a violet outline that fills on hover. Mobile menu (resize <768px, click hamburger) shows the same numbered list.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "refactor(navbar): italic-serif logo + numbered mono nav links"
```

---

### Task 11: Refactor `Hero` (signature section — RadialOrbital + editorial typography)

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Hero.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import RadialOrbital from './ui/RadialOrbital'
import StatusPill from './ui/StatusPill'

const techStack = [
  'Databricks', 'AWS', 'LangChain', 'PySpark', 'Snowflake', 'Terraform', 'Azure', 'GCP',
]

const dynamicLines = [
  '> Building AI agents & MCP servers at Deloitte',
  '> Orchestrating multi-agent systems with LangGraph & AWS Strands',
  '> Designing data platforms on AWS, Databricks & Snowflake',
  '> 10x certified across AWS, Databricks, Snowflake, GCP & Azure',
]

const orbitalNodes = [
  { label: 'LangGraph',    ringIndex: 0, angle: -30 },
  { label: 'AWS Strands',  ringIndex: 0, angle: 60 },
  { label: 'MCP',          ringIndex: 1, angle: 200 },
  { label: 'Databricks',   ringIndex: 0, angle: 150 },
  { label: 'LLM',          ringIndex: 2, angle: 90 },
  { label: 'Snowflake',    ringIndex: 1, angle: 320 },
]

function TypingRotator({ lines }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = lines[lineIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 35)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 18)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setLineIndex((lineIndex + 1) % lines.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, lineIndex, lines])

  return (
    <span className="font-mono text-xs md:text-sm text-ink-muted">
      {displayed}
      <span className="cursor-blink" />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Subtle radial-gradient backdrop behind the orbital (CSS, no WebGL) */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-50" />

      {/* Centerpiece orbital */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        <RadialOrbital
          size={320}
          nodes={orbitalNodes}
          caption="CORE → AGENTS → TOOLS → MCP"
          intensity="full"
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[1.02] tracking-tight mb-6"
        >
          Engineering the{' '}
          <em className="font-display italic bg-gradient-to-r from-violet to-accent bg-clip-text text-transparent">
            AI-native
          </em>{' '}
          era.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-ink-muted text-lg md:text-xl font-light max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          AI Engineer at Deloitte — building agents, MCP servers, and data platforms at enterprise scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mb-8 flex justify-center"
        >
          <TypingRotator lines={dynamicLines} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-1.5 mb-8"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full
                hover:border-violet/30 hover:text-violet transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
          className="flex justify-center mb-8"
        >
          <StatusPill label="AVAILABLE FOR SELECT PROJECTS" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet to-accent text-ink font-semibold text-sm
              hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-400 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/10 text-ink-muted font-medium text-sm
              hover:border-violet/40 hover:text-violet transition-all duration-300 group flex items-center gap-2"
          >
            Get In Touch
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-violet/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-violet" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`. Acceptance checks:
- Centerpiece orbital is visible with three slow-rotating concentric rings, glowing violet→cyan core, and ~6 cyan dot nodes on the rings.
- Hovering an orbital dot reveals a small mono label (e.g. "LANGGRAPH").
- Below orbital: caption "CORE → AGENTS → TOOLS → MCP" in mono.
- Headline "Engineering the *AI-native* era." renders in Instrument Serif. "AI-native" is italic with violet→cyan gradient text.
- Sub: "AI Engineer at Deloitte — building agents, MCP servers, and data platforms at enterprise scale." in Inter.
- Below it, a single typed mono line cycles through the four `dynamicLines`.
- Tech badges row: 8 small mono pills with thin borders.
- StatusPill: glass pill with pulsing green dot + "AVAILABLE FOR SELECT PROJECTS" in mono.
- Two CTAs: "View My Work" (gradient) + "Get In Touch" (outline).
- At 375px: orbital scales down or the section still fits with no horizontal scroll. Headline wraps cleanly.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "refactor(hero): radial-orbital centerpiece + editorial italic-serif headline + status pill"
```

---

### Task 12: Refactor `About` (orbital echo avatar + bio rewrite + SectionHeader 01)

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/About.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Briefcase, GraduationCap, Phone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import RadialOrbital from './ui/RadialOrbital'

const quickFacts = [
  { icon: MapPin, text: 'Bengaluru, India' },
  { icon: Briefcase, text: 'AI Engineer @ Deloitte' },
  { icon: GraduationCap, text: 'B.Tech, ECE' },
  { icon: Phone, text: '+91 9052472001' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="01" title="About." italicWord="About" />

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 items-start">
          {/* Avatar slot — orbital echo around the MP monogram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-60 h-60 md:w-72 md:h-72 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <RadialOrbital size={288} nodes={[]} intensity="subtle" />
              </div>
              <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-surface border border-white/10 flex items-center justify-center">
                {/* When a real photo is supplied, replace the inner span with:
                    <img src="/photo.jpg" alt="Mohith Penumuru" className="w-full h-full object-cover" /> */}
                <span className="font-display text-5xl text-ink/30 select-none">MP</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-display text-2xl md:text-[1.7rem] text-ink leading-snug mb-6 tracking-tight">
              A versatile AI &amp; Data Engineer crafting{' '}
              <em className="italic text-violet">intelligent</em> systems where data,
              agents, and cloud infrastructure converge.
            </p>
            <p className="text-ink-muted text-base leading-relaxed mb-8">
              Currently at Deloitte, building AI agents, MCP servers, and multi-agent
              orchestrations with{' '}
              <em className="font-display italic text-accent">intent</em> —
              turning enterprise data into autonomous decision-making.
            </p>

            <div className="flex flex-wrap gap-2">
              {quickFacts.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 font-mono text-[11px] text-ink-muted glass px-3.5 py-1.5 rounded-full"
                >
                  <Icon size={12} className="text-violet" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`. Acceptance checks:
- Section header reads "— 01 —" in mono with serif title "About." (italic on "About").
- Left column: MP monogram inside a circle, with a faint orbital ring (no labels) rotating around it at low opacity.
- Right column: editorial bio with italic "intelligent" in violet and italic "intent" in cyan-leaning serif.
- Quick facts: 4 mono pills with violet icons.
- Mobile (375px): avatar centers, bio stacks below. No horizontal scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "refactor(about): orbital-echo avatar + editorial bio + numbered SectionHeader"
```

---

### Task 13: Refactor `Experience` (Deloitte Sep 2025 + 2 new bullets + violet timeline + SectionHeader 02)

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Experience.jsx`:

```jsx
import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const timelineData = [
  {
    title: 'Deloitte',
    content: {
      role: 'AI Engineer',
      duration: 'Sep 2025 — Present',
      location: 'Bengaluru, India',
      highlights: [
        'Building MCP server marketplace and tooling — designing reusable Model Context Protocol integrations that let enterprise agents plug into internal data, APIs, and tools.',
        'Multi-agent orchestration with LangGraph and AWS Strands — composing collaborating agent graphs (planner → researcher → executor) for complex enterprise workflows.',
        'Building and evaluating AI Agents using multiple agentic workflows and frameworks',
        'Designing and implementing AI agentic workflows for client solutions',
        'Working with Large Language Models (LLMs), LangChain, and Generative AI technologies',
        'Building AI-powered automation pipelines for intelligent decision-making',
      ],
    },
  },
  {
    title: 'Accenture',
    content: {
      role: 'Data Engineering, Management & Governance Analyst',
      duration: 'Jan 2023 — Sep 2024',
      location: 'Bengaluru, India',
      highlights: [
        'Developed and automated ETL pipelines using AWS Glue, EMR, Lambda, EventBridge, Step Functions, and Airflow',
        'Utilized Databricks with PySpark for data aggregation, processing, and building ML models across stock, cricket, and taxi datasets',
        'Optimized data pipelines using Spark SQL for real-time analytics and high-performance querying',
        'Integrated processed data into Snowflake using stored procedures, tasks, functions, and Snowpark Python',
        'Built interactive dashboards and managed Salesforce Marketing Cloud (SFMC) data extensions and automations',
        'Worked with Amazon Redshift and Amazon RDS for large-scale data storage and querying',
        'Managed CI/CD workflows using GitHub Actions, Jenkins, Groovy scripts, and Terraform',
        'Conducted extensive performance tuning and refactored ETL jobs to reduce runtime and cost',
      ],
    },
  },
  {
    title: 'Education',
    content: {
      isEducation: true,
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Electronics & Communication Engineering',
      institution: 'Sree Vidyanikethan Engineering College, Tirupati',
      duration: 'June 2018 — June 2022',
    },
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <section id="experience" className="section-pad" ref={sectionRef}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="02"
          title="Where I have built."
          italicWord="built"
          subtitle="My professional journey in AI & Data engineering."
        />

        <div ref={timelineRef} className="relative pb-10">
          {timelineData.map((item, index) => (
            <TimelineEntry
              key={index}
              title={item.title}
              content={item.content}
              isEducation={item.content.isEducation}
            />
          ))}

          <div
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
            style={{
              height: height + 'px',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-violet via-violet/60 to-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({ title, content, isEducation }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex justify-start pt-10 md:pt-20 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-surface flex items-center justify-center">
          <div
            className={`h-4 w-4 rounded-full border ${
              isEducation
                ? 'bg-violet/20 border-violet/40'
                : 'bg-violet/10 border-violet/40'
            }`}
          />
        </div>
        <h3 className="hidden md:block font-display text-3xl md:pl-20 md:text-5xl text-ink/10 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block font-display text-2xl mb-4 text-ink/15 tracking-tight">
          {title}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass p-7"
        >
          {isEducation ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-violet" />
                </div>
                <p className="font-mono text-[11px] text-violet tracking-widest uppercase">
                  {content.duration}
                </p>
              </div>
              <h4 className="font-display text-xl text-ink mb-1">{content.degree}</h4>
              <p className="text-ink-muted text-sm mb-1">{content.field}</p>
              <p className="text-ink-dim text-xs">{content.institution}</p>
            </>
          ) : (
            <>
              <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">
                {content.duration}
              </p>
              <h4 className="font-display text-2xl text-ink mb-1 tracking-tight">{content.role}</h4>
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-wider mb-5">
                {content.location}
              </p>
              <ul className="space-y-2.5">
                {content.highlights.map((h, i) => (
                  <li key={i} className="text-ink-muted text-sm leading-relaxed flex gap-3">
                    <span className="text-violet/60 mt-1.5 shrink-0 text-[10px]">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Experience. Acceptance checks:
- Section header reads "— 02 —" + "Where I have *built*." (italic on "built").
- Deloitte card duration reads **`SEP 2025 — PRESENT`** (mono, cyan).
- The first two Deloitte bullets read exactly:
  - "Building MCP server marketplace and tooling — …"
  - "Multi-agent orchestration with LangGraph and AWS Strands — …"
- Progress line on the left fills with violet only (no rainbow).
- Big watermark titles ("Deloitte", "Accenture", "Education") render in Instrument Serif at low opacity.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "refactor(experience): correct Deloitte to Sep 2025 + add MCP & multi-agent bullets + numbered header"
```

---

### Task 14: Refactor `Skills` (bento grid using `BentoTile` + SectionHeader 03)

**Files:**
- Modify: `src/components/Skills.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Skills.jsx`:

```jsx
import SectionHeader from './ui/SectionHeader'
import BentoTile from './ui/BentoTile'

/**
 * Bento layout — varied tile sizes for visual rhythm.
 * `span` is honored at md+ breakpoints; mobile is a single column stack.
 *
 * Layout intent (md grid is 4 cols):
 *  Row 1:  [ AI 2x2 (featured)              ] [ Programming 1x1 ] [ Databases 1x1 ]
 *  Row 2:  [ AI continues                   ] [ Big Data 2x1                       ]
 *  Row 3:  [ Cloud Platforms 2x1            ] [ DevOps 1x1      ] [ Orchestration 1x1 ]
 *  Row 4:  [ Data Engineering 1x1 ] [ ML 1x1 ] [ Visualization 1x1 ] [ (empty) ]
 */
const tiles = [
  {
    title: 'AI & Generative AI',
    span: '2x2', accent: 'violet', featured: true,
    skills: ['Large Language Models', 'LangChain', 'AI Agents', 'MCP Servers', 'LangGraph', 'AWS Strands', 'Prompt Tuning', 'Agentic Workflows', 'Generative AI'],
  },
  {
    title: 'Programming',
    span: '1x1', accent: 'cyan',
    skills: ['Python', 'SQL', 'PySpark', 'Spark SQL', 'Shell'],
  },
  {
    title: 'Databases',
    span: '1x1', accent: 'cyan',
    skills: ['Snowflake', 'Redshift', 'RDS', 'MySQL', 'DynamoDB', 'MongoDB'],
  },
  {
    title: 'Big Data & Processing',
    span: '2x1', accent: 'cyan',
    skills: ['Databricks', 'Apache Spark', 'Apache Airflow', 'AWS Glue', 'AWS EMR', 'Delta Lake'],
  },
  {
    title: 'Cloud Platforms',
    span: '2x1', accent: 'cyan',
    skills: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
  },
  {
    title: 'DevOps & CI/CD',
    span: '1x1', accent: 'cyan',
    skills: ['GitHub Actions', 'Jenkins', 'Terraform', 'Docker', 'Groovy'],
  },
  {
    title: 'Orchestration',
    span: '1x1', accent: 'cyan',
    skills: ['Airflow', 'Step Functions', 'Lambda', 'EventBridge'],
  },
  {
    title: 'Data Engineering',
    span: '1x1', accent: 'cyan',
    skills: ['ETL/ELT', 'Data Lakes', 'Warehousing', 'Modeling', 'Governance'],
  },
  {
    title: 'Machine Learning',
    span: '1x1', accent: 'cyan',
    skills: ['Model Development', 'Feature Engineering', 'Predictive Analytics', 'MLOps'],
  },
  {
    title: 'Visualization',
    span: '1x1', accent: 'cyan',
    skills: ['AWS QuickSight', 'SFMC Dashboards', 'Storytelling'],
  },
]

function SkillChips({ skills, accent }) {
  const chipClass =
    accent === 'violet'
      ? 'text-violet/90 bg-violet/5 border-violet/15 hover:bg-violet/10'
      : 'text-ink-muted bg-white/[0.02] border-white/10 hover:border-violet/30 hover:text-violet'
  return (
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {skills.map((s) => (
        <span
          key={s}
          className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-colors duration-300 ${chipClass}`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="03" title="The toolkit." italicWord="toolkit" />

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {tiles.map((tile, i) => (
            <BentoTile
              key={tile.title}
              span={tile.span}
              label={tile.title}
              accent={tile.accent}
              featured={tile.featured}
              index={i}
            >
              <SkillChips skills={tile.skills} accent={tile.accent} />
            </BentoTile>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Skills. Acceptance checks:
- Section header: "— 03 —" + "The *toolkit*."
- Desktop (≥768px): grid is bento — AI tile is large 2x2 in the top-left with a faint orbital echo behind it; Big Data and Cloud Platforms span 2 columns wide; remaining tiles are 1x1.
- AI tile uses violet chips. All other tiles use neutral chips that turn violet on hover.
- Mobile (<768px): tiles stack one-per-row.
- No tile chips overflow.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "refactor(skills): replace uniform grid with bento layout (AI 2x2 featured)"
```

---

### Task 15: Refactor `Certifications` (summary line + SectionHeader 04 + typography pass)

**Files:**
- Modify: `src/components/Certifications.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Certifications.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const certifications = [
  { name: 'Certified Data Engineer Associate', provider: 'AWS',         accent: 'from-amber-500/20 to-orange-600/20', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Certified Data Engineer Professional', provider: 'Databricks', accent: 'from-red-500/20 to-orange-500/20', text: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'Certified Generative AI Engineer Associate', provider: 'Databricks', accent: 'from-red-500/20 to-orange-500/20', text: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'SnowPro Core Certified', provider: 'Snowflake',              accent: 'from-cyan-500/20 to-blue-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'Terraform Associate (003)', provider: 'HashiCorp',           accent: 'from-purple-500/20 to-violet-500/20', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Cloud Data Engineer Professional', provider: 'Google Cloud', accent: 'from-blue-500/20 to-green-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Associate Data Practitioner', provider: 'Google Cloud',      accent: 'from-blue-500/20 to-green-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Azure Data Engineer Associate', provider: 'Microsoft',       accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  { name: 'Azure Fundamentals', provider: 'Microsoft',                  accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  { name: 'Azure Data Fundamentals', provider: 'Microsoft',             accent: 'from-blue-600/20 to-sky-500/20', text: 'text-sky-400', bg: 'bg-sky-500/10' },
]

function CertCard({ cert, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative glass glass-hover p-5 group overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full ${cert.bg} ${cert.text}`}>
            {cert.provider}
          </span>
          <Award size={14} className={`${cert.text} opacity-40`} />
        </div>
        <h3 className="font-display text-base text-ink leading-snug tracking-tight">
          {cert.name}
        </h3>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="04"
          title="Industry-recognized."
          italicWord="recognized"
          subtitle="10 industry certifications across AWS, Databricks, Snowflake, Google Cloud, Microsoft Azure, and HashiCorp."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Certifications. Acceptance checks:
- Section header: "— 04 —" + "Industry-*recognized*." with subtitle line below.
- Cards: smaller mono provider chip, smaller award icon, cert names in Instrument Serif.
- Hover overlay still appears.
- 5-col grid on desktop, 3-col tablet, 2-col mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications.jsx
git commit -m "refactor(certifications): summary subtitle + numbered SectionHeader + typography pass"
```

---

### Task 16: Refactor `Projects` (MetricBadge headline + SectionHeader 05 + typography)

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Projects.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import MetricBadge from './ui/MetricBadge'

/**
 * Headline metrics — placeholder values approved in spec §3.7.
 * Mohith to confirm or replace before publishing.
 */
const projects = [
  {
    title: 'Enterprise Data Engineering Platform',
    metric: { value: '60% ↓', label: 'runtime reduction' },
    description:
      'Designed scalable ETL pipelines using Talend and AWS Glue to ingest data into AWS S3 and Delta Lake. Used PySpark on Databricks for distributed data transformation and ML-based analytics.',
    tech: ['Databricks', 'PySpark', 'AWS', 'Talend', 'Snowflake', 'Airflow'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Data Pipeline Flow',
      stages: [
        { name: 'Sources', color: 'bg-amber-500/80' },
        { name: 'S3 / Delta Lake', color: 'bg-orange-500/80' },
        { name: 'PySpark Transform', color: 'bg-violet' },
        { name: 'Snowflake', color: 'bg-accent' },
        { name: 'Analytics', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'Predictive Analytics Platform',
    metric: { value: '3 domains', label: 'modeled' },
    description:
      'Built ML models on Databricks to forecast trends in stock prices, player performance, and taxi demand. Stored analytics-ready datasets in Snowflake with interactive QuickSight dashboards.',
    tech: ['ML', 'Databricks', 'PySpark', 'Snowflake', 'AWS QuickSight'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Medallion Architecture',
      stages: [
        { name: 'Raw Data', color: 'bg-gray-500' },
        { name: 'Bronze', color: 'bg-amber-700/80' },
        { name: 'Silver', color: 'bg-gray-400' },
        { name: 'Gold', color: 'bg-yellow-500/80' },
        { name: 'ML / Dashboards', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'Data Platform CI/CD & Infra Automation',
    metric: { value: '100%', label: 'infra as code' },
    description:
      'Created automated CI/CD pipelines using GitHub Actions and Jenkins for Databricks notebooks and infrastructure updates. Used Terraform to provision AWS resources.',
    tech: ['Terraform', 'GitHub Actions', 'Jenkins', 'Groovy', 'AWS'],
    github: '#',
    live: null,
    pipeline: {
      label: 'CI/CD Pipeline',
      stages: [
        { name: 'Code Push', color: 'bg-gray-500' },
        { name: 'GitHub Actions', color: 'bg-violet' },
        { name: 'Terraform Plan', color: 'bg-violet/70' },
        { name: 'Deploy', color: 'bg-accent' },
        { name: 'Monitor', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'AI Agents & MCP Server Development',
    metric: { value: '4+ agents', label: 'in production' },
    description:
      'Building enterprise AI agents using multiple agentic workflows and frameworks at Deloitte. Developing MCP servers for seamless AI integrations and optimizing agent performance.',
    tech: ['Python', 'LangChain', 'LLMs', 'MCP Protocol', 'Agentic Frameworks'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Agentic Workflow',
      stages: [
        { name: 'User Input', color: 'bg-gray-500' },
        { name: 'LangChain', color: 'bg-emerald-600/80' },
        { name: 'LLM', color: 'bg-violet' },
        { name: 'MCP Server', color: 'bg-accent' },
        { name: 'Response', color: 'bg-emerald-500/80' },
      ],
    },
  },
]

function PipelineViz({ pipeline, active }) {
  return (
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
      active ? 'max-h-40 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
    }`}>
      <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] mb-3">
        {pipeline.label}
      </p>
      <div className="flex items-center gap-1">
        {pipeline.stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-1 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className={`h-1.5 rounded-full ${stage.color} flow-dot`} style={{ animationDelay: `${i * 0.4}s` }} />
              <p className="font-mono text-[9px] text-ink-dim mt-1.5 truncate">{stage.name}</p>
            </div>
            {i < pipeline.stages.length - 1 && (
              <ChevronRight size={10} className="text-ink-faint shrink-0 -mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [showPipeline, setShowPipeline] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass project-glow p-7 flex flex-col group"
      onMouseEnter={() => setShowPipeline(true)}
      onMouseLeave={() => setShowPipeline(false)}
    >
      <div className="flex items-start justify-between mb-5">
        <MetricBadge value={project.metric.value} label={project.metric.label} />
        <button
          onClick={() => setShowPipeline(!showPipeline)}
          className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border transition-all duration-300 ${
            showPipeline
              ? 'text-violet border-violet/30 bg-violet/10'
              : 'text-ink-dim border-white/5 hover:border-violet/20 hover:text-ink-muted'
          }`}
        >
          Pipeline
        </button>
      </div>

      <h3 className="font-display text-2xl text-ink mb-3 tracking-tight group-hover:text-violet transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-ink-muted text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <PipelineViz pipeline={project.pipeline} active={showPipeline} />

      <div className="flex flex-wrap gap-1.5 mb-5 mt-4">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.github && project.github !== '#' && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-violet transition-colors" aria-label="View source code">
            <Github size={18} />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-violet transition-colors" aria-label="View live demo">
            <ExternalLink size={18} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="05"
          title="Selected work."
          italicWord="work"
          subtitle="Hover or tap Pipeline to see the architecture flow."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Projects. Acceptance checks:
- Section header: "— 05 —" + "Selected *work*."
- Each card top-left shows a large mono metric (e.g. **`60% ↓`**) with a small uppercase mono caption ("RUNTIME REDUCTION") underneath.
- Top-right has a "Pipeline" toggle button.
- Card titles render in Instrument Serif.
- Hover reveals pipeline visualization (existing behavior preserved).

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "refactor(projects): MetricBadge headline + numbered SectionHeader + serif titles"
```

---

### Task 17: Refactor `Publication` (SectionHeader 06 + 01 numeral + serif paper title)

**Files:**
- Modify: `src/components/Publication.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Publication.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

export default function Publication() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="publication" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="06" title="Published research." italicWord="research" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start gap-5 mb-5">
              <span className="font-mono text-violet/30 text-3xl select-none leading-none">01</span>
              <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-violet" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-snug mb-3 tracking-tight">
                  Design and Simulation of Glass Shaped Patch Antenna Array with
                  Circular Slots for Wireless Applications
                </h3>
                <p className="font-mono text-[11px] text-ink-dim leading-relaxed">
                  Penumuru Mohith · Pulimi Sai Nitish Kumar · Ari Jeevan Kumar · Pathipati Venkata Sai Chandradhar · K. Neelima · N. Vikram Teja
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5 ml-[88px]">
              <span className="font-mono text-[10px] text-violet bg-violet/5 border border-violet/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Springer Nature
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                ICIHCNN 2022
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Published Jan 2025
              </span>
              <span className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Pages 805–812
              </span>
            </div>

            <p className="text-ink-muted text-sm leading-relaxed mb-6 ml-[88px]">
              Presented a Glass-shaped patch antenna array with circular slots
              designed to operate at 7.5 GHz. Achieved 9.2 dB Gain, 1.09 VSWR,
              and &minus;27.658 dB Return loss. Designs developed and simulated
              in Ansys HFSS.
            </p>

            <div className="ml-[88px]">
              <a
                href="https://link.springer.com/chapter/10.1007/978-981-99-2832-3_93"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] text-violet hover:text-ink transition-colors duration-300 uppercase tracking-wider"
              >
                View on Springer
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Publication. Acceptance checks:
- Section header: "— 06 —" + "Published *research*."
- Card now shows a large mono `01` numeral on the left, then the BookOpen icon, then the paper title in Instrument Serif.
- Author list and metadata pills render in JetBrains Mono.
- "View on Springer" link is mono uppercase.

- [ ] **Step 3: Commit**

```bash
git add src/components/Publication.jsx
git commit -m "refactor(publication): numbered SectionHeader + serif title + mono metadata"
```

---

### Task 18: Delete `CTA.jsx` and remove from `App.jsx`

**Files:**
- Delete: `src/components/CTA.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Remove the CTA import and render**

In `src/App.jsx`:

- Delete line 9: `import CTA from './components/CTA'`
- Delete line 79: `<CTA />`

After both edits, the relevant region of `src/App.jsx` should look like:

```jsx
        <Publication />
        <div className="section-divider" />
        <Contact />
```

- [ ] **Step 2: Delete the file**

Run: `git rm "src/components/CTA.jsx"`

- [ ] **Step 3: Verify**

Run: `npm run build` — success (no orphan import).
Run: `npm run dev` — page no longer renders the CTA terminal block between Publication and Contact. (Contact will still look the same — Task 19 absorbs the terminal.)

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: remove standalone CTA section (terminal merges into Contact)"
```

---

### Task 19: Refactor `Contact` (absorb terminal block + SectionHeader 07 + italic "build")

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Contact.jsx`:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

function TerminalBlock() {
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-[10px] text-ink-dim ml-2">terminal</span>
      </div>
      <div className="p-5 font-mono text-[12px] space-y-2.5 leading-relaxed">
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-muted"> mohith.penumuru</span>
          <span className="text-ink-dim"> --status</span>
          <span className="text-emerald-400"> available</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --location</span>
          <span className="text-ink-muted"> bengaluru</span>
          <span className="text-ink-dim"> --open-to</span>
          <span className="text-amber-400"> remote</span>
          <span className="text-ink-dim">|</span>
          <span className="text-amber-400">hybrid</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --expertise</span>
          <span className="text-violet/80"> &quot;AI Agents · MCP&quot;</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> --stack</span>
          <span className="text-accent"> &quot;Databricks · AWS · LangGraph · Snowflake&quot;</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-violet">&gt;</span>
          <span className="text-ink-dim"> Ready to collaborate</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section-pad" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="07"
          title="Let us build something."
          italicWord="build"
          subtitle="Open to AI & data engineering roles, consulting, and cloud platform projects."
        />

        <div className="grid md:grid-cols-[1fr_360px] gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Name</label>
                <input
                  id="name" type="text" required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                    focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Email</label>
                <input
                  id="email" type="email" required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                    focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Subject</label>
              <input
                id="subject" type="text"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                  focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-[11px] text-ink-dim uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea
                id="message" rows={5} required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint
                  focus:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/20 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet to-accent text-ink font-mono text-[11px] uppercase tracking-wider
                hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              {submitted ? 'Sent' : 'Send Message'}
              <Send size={13} />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <TerminalBlock />

            <div className="glass p-6">
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em] mb-4">Direct</p>
              <div className="space-y-3">
                <a href="mailto:mohithpenumuru1@gmail.com" className="flex items-center gap-3 text-sm text-ink-muted hover:text-violet transition-colors">
                  <Mail size={14} className="text-violet" />
                  mohithpenumuru1@gmail.com
                </a>
                <a href="tel:+919052472001" className="flex items-center gap-3 text-sm text-ink-muted hover:text-violet transition-colors">
                  <Phone size={14} className="text-violet" />
                  +91 9052472001
                </a>
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <MapPin size={14} className="text-violet" />
                  Bengaluru, India
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.25em] mb-4">Socials</p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/', label: 'LinkedIn' },
                  { icon: Github,   href: 'https://github.com/mohithpenumuru', label: 'GitHub' },
                  { icon: Mail,     href: 'mailto:mohithpenumuru1@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center
                      text-ink-dim hover:text-violet hover:border-violet/30 hover:bg-violet/5 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.

Run: `npm run dev`, scroll to Contact. Acceptance checks:
- Section header: "— 07 —" + "Let us *build* something." with the subtitle.
- Left column (~60% width): form with mono uppercase labels, gradient mono "SEND MESSAGE" button.
- Right column (~40%): terminal block at top (with red/yellow/green dots, mock CLI output), then a "Direct" glass card with email/phone/location, then a "Socials" glass card with three icons.
- Mobile: form on top, right column stacks below.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "refactor(contact): absorb CTA terminal into right column + numbered SectionHeader"
```

---

### Task 20: Refactor `Footer` (Inter typography + serif logo to match Navbar)

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/Footer.jsx`:

```jsx
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-ink">MP<em className="not-italic text-violet">.</em></span>
          <p className="font-mono text-[11px] text-ink-dim flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Mohith Penumuru · Crafted with
            <Heart size={11} className="text-violet" />
          </p>
        </div>

        <div className="flex items-center gap-5">
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/', label: 'LinkedIn' },
            { icon: Github,   href: 'https://github.com/mohithpenumuru', label: 'GitHub' },
            { icon: Mail,     href: 'mailto:mohithpenumuru1@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-ink-dim hover:text-violet transition-colors duration-300"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` — success.
Run: `npm run dev`, scroll to bottom. Footer shows the `MP.` serif logo (matching Navbar) + mono copyright line + 3 social icons.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "refactor(footer): serif logo to match Navbar + mono caption"
```

---

## Phase 4 — Final verification & cleanup

### Task 21: Full-site responsive verification + fix any regressions

**Files:** none (verification + targeted fixes)

- [ ] **Step 1: Build and serve**

```bash
npm run build
npm run preview
```

Open the preview URL printed by Vite (typically `http://localhost:4173/`).

- [ ] **Step 2: Walk every section at desktop (≥1280px)**

Confirm each item in spec §7 Success Criteria:

1. Hero: orbital + radial-gradient backdrop + italic-serif headline + status pill ✓
2. Typography swap: open DevTools → inspect any heading; `font-family` resolves to **Instrument Serif** (not Syne). Inspect any body text → **Inter** (not Manrope). ✓
3. Every section header reads `— 0X —` + serif title with one italic word ✓
4. Skills is a bento layout (varied tile sizes) ✓
5. Each project card shows a headline metric ✓
6. Deloitte reads `Sep 2025 — Present` with the two new bullets at the top ✓
7. No standalone CTA between Publication and Contact ✓

- [ ] **Step 3: Walk every section at tablet (768px) and mobile (375px)**

Use Chrome DevTools device toolbar. For each breakpoint, scroll the entire page and confirm:
- No horizontal scroll
- No overlapping text
- Hero orbital still fits (it may scale down — that's fine)
- Bento grid collapses to a single column at <768px
- Forms remain usable; pills wrap

If a regression is found, **fix it inline in this task** with a small targeted Edit, then commit:

```bash
git add <file>
git commit -m "fix(<section>): <what>"
```

- [ ] **Step 4: Verify build artifact**

Run: `npm run build` once more. Confirm `dist/` produced and no warnings beyond Vite's normal output.

- [ ] **Step 5: Final grep for stale tokens**

Run these greps; each should return zero matches:

- `Syne` in `src/`, `index.html`, `tailwind.config.js`
- `Manrope` in `src/`, `index.html`, `tailwind.config.js`
- `font-heading` in `src/` (replaced by `font-display`)
- `from './components/CTA'` anywhere
- `#030014` anywhere outside this plan and the spec (the surface color is now `#06060a`)

If any match remains, replace it (Edit tool) and commit:

```bash
git commit -m "chore: scrub remaining <token> references"
```

- [ ] **Step 6: Final commit (if no regressions found)**

If steps 3-5 produced no fix commits, no commit is needed for this task — the verification gate is enough.

---

## Out of Scope (do NOT add to this plan)

Per spec §6 — explicitly rejected: 3D Spline, WebGL shaders, light-mode toggle, blog, testimonials, i18n, analytics, server-side anything, replacing framer-motion or Tailwind.

If any of these surface during implementation as "wouldn't it be cool to also…" — say no and finish the plan.

---

## Open Questions (per spec §8)

These are flagged for the user, not blockers for implementation:

1. **Project metrics** in Task 16 (`60% ↓`, `3 domains`, `100%`, `4+ agents`) — placeholder values approved in the spec. If Mohith provides better numbers before/during implementation, update the `metric` fields in `projects[]`.
2. **Real headshot** — when supplied, drop into `src/components/About.jsx` per the inline comment in Task 12 step 1.
3. **Bento tile sizing** — the `span` values in Task 14 are a starting point. If the visual rhythm feels off after Task 14, retune `span` values inline (no separate task needed).
