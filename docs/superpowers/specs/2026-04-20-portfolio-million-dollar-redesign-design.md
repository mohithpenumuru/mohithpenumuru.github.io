# Portfolio "Million-Dollar" Redesign — Design Spec

**Date:** 2026-04-20
**Owner:** Mohith Penumuru
**Project:** `my_site` (React + Vite + Tailwind portfolio)
**Status:** Approved — ready for implementation plan

---

## 1. Goal & Brand North Star

Take the existing dark portfolio from "polished personal site" to **AI-native enterprise-grade portfolio** that reads like a small AI lab's product page.

**Brand line:** *"AI engineering, crafted with intent."*

**Personality:** Editorial luxury (Stripe Press, OpenAI About, Anthropic) on the surface, AI-native in the heart (one signature orbital "AI brain" motif that recurs subtly).

**Operating principle:** Restraint > spectacle. One signature element done flawlessly beats five competing for attention. Every "wow" must serve the story.

## 2. Foundation — Design System Changes

### 2.1 Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display | **Instrument Serif** | 400, 400-italic | Hero headline, section titles. Italic weight used as *accent motif* on 1–2 key words per heading. |
| Body | **Inter** | 300, 400, 500, 600, 700, 800 | All paragraphs, UI, labels. |
| Mono | **JetBrains Mono** | 400, 500 | Section numbers ("01"), terminal block, code, micro-labels. |

All three are Google Fonts. Combined transfer ~80–100KB.
Replace existing `Syne` and `Manrope` references in `tailwind.config.js`, `index.html` `<link>` tags, and `index.css`.

### 2.2 Color Tokens (Tailwind extend)

```js
colors: {
  surface: {
    DEFAULT: '#06060a',     // (was #030014 — slightly warmer)
    light:   '#0c0c12',
    lighter: '#14141c',
  },
  violet: '#8b5cf6',         // primary accent (keep)
  accent: '#22d3ee',          // cyan — used SPARINGLY (was #00d4ff)
  ink: {
    DEFAULT: '#fafafa',       // primary text
    muted:   '#94a3b8',       // secondary
    dim:     '#737373',       // tertiary
    faint:   '#404040',       // borders/dividers
  }
}
```

### 2.3 Motion & Effect Tokens

| Token | Value | Notes |
|---|---|---|
| Mesh blobs | **2** (was 4) | Calmer background. One violet, one cyan, both larger and slower (35s cycle). |
| Hero shader | Lightweight CSS-radial-gradient layered + slow rotation animation | Behind orbital, ~30% opacity. No WebGL required. |
| Glass blur | `12px` (was `20px`) | Less frosted, more refined. |
| Glass border | `rgba(255,255,255,0.06)` (was violet-tinted) | Neutral; violet only on hover/active. |
| Default fade-up | `0.6s` ease-out (was `0.5s`) | Slightly slower, more deliberate. |
| Stagger | `0.05s` per item (was `0.06s`) | Tighter. |
| **Removed animations** | Cut ~30% of fade-ups on tertiary elements (badges, tech pills) | Animate containers, not children. |

### 2.4 Spacing & Layout

- **Max container width:** `1120px` (was 1152) — slightly tighter editorial feel.
- **Section padding:** Increase to `py-32 md:py-40` (was `py-24`). More vertical breathing room.
- **Section divider:** Keep gradient line, halve opacity.

## 3. Section-by-Section Spec

Final order: **Navbar → Hero → About → Experience → Skills → Certifications → Projects → Publication → Contact → Footer**

(CTA component is **deleted**; its terminal block merges into Contact.)

### 3.1 Navbar (`components/Navbar.jsx`)

- Logo: `MP` in Instrument Serif italic, with violet period: `MP*.*`
- Section numbers ("01 — About", "02 — Work", etc.) replace plain labels in mono
- "Resume" button: violet outline, fills on hover
- Scrolled state: thinner glass, slightly more opaque
- Mobile menu: unchanged structure, updated typography

### 3.2 Hero (`components/Hero.jsx`) — **Signature**

- **Background:** Surface base + radial-gradient shader (subtle, slow `aurora`-style rotation) at ~30% opacity behind the orbital.
- **Centerpiece — Radial Orbital "AI Brain":**
  - Built in pure CSS/SVG + framer-motion (no Spline, no WebGL)
  - Concentric rings: 280px outer (solid), 180px middle (dashed), 90px inner (solid glow)
  - Core: 36px violet→cyan gradient orb, soft glow halo
  - **4–6 orbiting nodes** along the rings — each labeled on hover with: `LangGraph`, `AWS Strands`, `MCP`, `Databricks`, `LLM`, `Snowflake`
  - Slow continuous rotation per ring (different speeds, opposite directions)
  - Below orbital: small mono caption "CORE → AGENTS → TOOLS → MCP"
- **Headline (Instrument Serif, ~5.5rem):**
  > Engineering the *AI-native* era.

  ("AI-native" in italic Instrument Serif, gradient violet→cyan)
- **Sub:** Inter 400, ink.muted, ~1.25rem:
  > AI Engineer at Deloitte — building agents, MCP servers, and data platforms at enterprise scale.
- **Status pill (mono, glass, near CTAs):** green dot + "Available for select projects"
- **Typing rotator** (existing `TypingRotator` component): **kept**, but restyled — smaller, mono, sits below the headline as a single rotating "now" line. Updated rotation lines to:
  - `> Building AI agents & MCP servers at Deloitte`
  - `> Orchestrating multi-agent systems with LangGraph & AWS Strands`
  - `> Designing data platforms on AWS, Databricks & Snowflake`
  - `> 10× certified across AWS, Databricks, Snowflake, GCP & Azure`
- **Tech badges row** (8 chips): unchanged content, refined styling — thinner border, mono font
- **CTAs:** unchanged labels — "View My Work" (gradient fill) + "Get In Touch" (outline)
- **Scroll indicator:** unchanged

### 3.3 About (`components/About.jsx`)

- Section number "01" + heading: *"About"* in Instrument Serif, italic on the word "About"
- Two-column grid: avatar slot (left), bio (right)
- **Avatar:** orbital ring around the MP monogram (echoes hero motif at ~50% scale, 1 ring + glow). Placeholder until real photo provided. When swapped: keep ring, replace inner monogram with `<img>`.
- **Bio:** 2 paragraphs (rewrite for editorial cadence — italic accents on `intelligent`, `intent`):
  > A versatile AI & Data Engineer crafting *intelligent* systems where data, agents, and cloud infrastructure converge.
  >
  > Currently at Deloitte, building AI agents, MCP servers, and multi-agent orchestrations with *intent* — turning enterprise data into autonomous decision-making.
- Quick-fact pills: refined — mono labels, thinner glass

### 3.4 Experience (`components/Experience.jsx`)

- Section number "02" + heading
- Keep scroll-tied progress line — but use violet-only gradient (less rainbow)
- Card refinements: more whitespace, mono date stamp, refined bullet style
- **Deloitte updated:** `Sep 2025 — Present` (was incorrectly `Sep 2024`)
- **Two new bullets added to Deloitte highlights array:**
  > • Building **MCP server marketplace and tooling** — designing reusable Model Context Protocol integrations that let enterprise agents plug into internal data, APIs, and tools.

  > • **Multi-agent orchestration with LangGraph and AWS Strands** — composing collaborating agent graphs (planner → researcher → executor) for complex enterprise workflows.
- Accenture and Education entries: unchanged content, updated typography

### 3.5 Skills (`components/Skills.jsx`) — **Bento Grid**

- Section number "03" + heading
- **Replace** uniform 3-column grid with bento layout (varied tile sizes)
- Reference: `ext_components/bentogrid.txt`
- Tile sizing strategy:
  - **Featured (2×2):** "AI & Generative AI" — visually dominant, with mini-orbital echo behind tile
  - **Wide (2×1):** "Big Data & Processing", "Cloud Platforms"
  - **Standard (1×1):** Programming, Databases, DevOps, Orchestration, Visualization, ML, Data Engineering
- Each tile: small mono category label, skill chips, subtle hover lift
- AI tile uses violet, others use ink.muted with violet on hover

### 3.6 Certifications (`components/Certifications.jsx`)

- Section number "04" + heading
- **Add summary line above grid:**
  > **10 industry certifications** across AWS, Databricks, Snowflake, Google Cloud, Microsoft Azure, and HashiCorp.
- Keep 5-column grid on desktop
- Refine cards: softer provider chip, smaller award icon, tighter cert name typography
- On hover: gradient overlay (current behavior, refined)

### 3.7 Projects (`components/Projects.jsx`) — **Display Cards + Metrics**

- Section number "05" + heading
- **Each card now leads with a HEADLINE METRIC** (large mono number/label):
  - Enterprise Data Engineering Platform → **`60% ↓`** runtime reduction
  - Predictive Analytics Platform → **`3 domains`** modeled (stock, cricket, taxi)
  - Data Platform CI/CD → **`100%`** infrastructure-as-code
  - AI Agents & MCP Server → **`4+`** production agents shipped
  - *(Mohith — confirm or replace these numbers in implementation. If unsure, ask before shipping.)*
- Reference: `ext_components/dsiplay_cardsc.txt` + `ext_components/featuresectioneffect.txt` for hover treatment
- Pipeline visualization: keep as hover-reveal, refined arrow chevrons
- Project number "01/02/03/04" stays as the large violet/20 numeral

### 3.8 Publication (`components/Publication.jsx`)

- Section number "06" + heading
- Add small "01" numeral matching project pattern
- Refine card: serif treatment for paper title, mono metadata, cleaner author list

### 3.9 ~~CTA~~ — **DELETE this component**

- Remove `components/CTA.jsx`
- Remove its render in `App.jsx`
- Migrate the terminal block markup into Contact (right column)

### 3.10 Contact (`components/Contact.jsx`) — **Now absorbs CTA**

- Section number "07" + heading: *"Let's build something."* (italic on "build")
- Subhead: "Open to AI & data engineering roles, consulting, and cloud platform projects."
- Layout: form (left, 60%) + right column (40%) containing:
  1. **Terminal block** (migrated from CTA — same content, just reframed in this column)
  2. Contact details (email, phone, location)
  3. Socials row
- "Send Message" button: refined to violet gradient, mono label

### 3.11 Footer (`components/Footer.jsx`)

- Unchanged structurally
- Update typography (Inter), ensure logo matches Navbar treatment

## 4. Reusable Pieces (new)

| Component | Purpose | Location |
|---|---|---|
| `RadialOrbital` | The hero's orbital animation; reused at low opacity behind About avatar and Skills AI tile | `components/ui/RadialOrbital.jsx` |
| `SectionHeader` | Numbered section header (mono number + serif title with optional italic accent) | `components/ui/SectionHeader.jsx` |
| `MetricBadge` | Large mono metric block for project cards | `components/ui/MetricBadge.jsx` |
| `StatusPill` | Green-dot availability pill for hero | `components/ui/StatusPill.jsx` |
| `BentoTile` | Variable-size tile with hover lift, used in Skills bento | `components/ui/BentoTile.jsx` |

## 5. Files Touched (summary)

**Modified:**
- `tailwind.config.js` (fonts, colors)
- `index.html` (Google Fonts links)
- `src/index.css` (typography, glass tweaks, divider opacity, removed unused keyframes)
- `src/App.jsx` (remove CTA, reduce mesh blobs to 2)
- All section components in `src/components/` (typography, copy, structural changes per section spec above)

**Created:**
- `src/components/ui/RadialOrbital.jsx`
- `src/components/ui/SectionHeader.jsx`
- `src/components/ui/MetricBadge.jsx`
- `src/components/ui/StatusPill.jsx`
- `src/components/ui/BentoTile.jsx`

**Deleted:**
- `src/components/CTA.jsx`

**Unchanged:**
- `vite.config.js`, `package.json` (no new dependencies needed)
- `.github/workflows/deploy.yml`
- `public/` assets

## 6. Out of Scope (explicit YAGNI)

The following were considered and **deliberately rejected** for this redesign:

- 3D Spline scenes (heavy payload, looks dated within a year, not needed)
- Custom WebGL shaders (CSS gradients accomplish 90% of the look at 0% complexity cost)
- Theme toggle / light mode (dark-only is on-brand)
- Blog/writing section (no content yet — add later when you have posts)
- Testimonials section (none collected — add later)
- Internationalization
- Analytics/tracking
- Server-side anything (still pure SPA on GitHub Pages)
- Replacing framer-motion or Tailwind

## 7. Success Criteria

The redesign is "done" when:

1. ✅ Hero has a working orbital + shader background, italic-serif headline, status pill
2. ✅ Typography swap is complete — no `Syne` or `Manrope` references remain
3. ✅ All section headers use the numbered format (`01 — About`, etc.)
4. ✅ Skills section is a bento grid (not a uniform 3-col grid)
5. ✅ Projects show headline metrics
6. ✅ Deloitte experience reads `Sep 2025 — Present` and includes the two new AI-trend bullets
7. ✅ CTA section is removed; terminal block lives in Contact
8. ✅ Builds with `npm run build` without errors
9. ✅ Renders correctly at mobile (375px), tablet (768px), desktop (1280px+)
10. ✅ Lighthouse Performance ≥ 90, Accessibility ≥ 95 (current is unknown — measure baseline first)

## 8. Open Questions for Implementation

- **Project metrics:** Confirm/replace the placeholder numbers in §3.7 before shipping
- **Photo:** When user provides a real headshot, drop into About avatar slot (orbital ring stays)
- **Bento exact tile sizing:** Will be tuned visually during implementation; tile-size strategy in §3.5 is a starting point
