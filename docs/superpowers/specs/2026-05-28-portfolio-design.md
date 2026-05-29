# Personal Portfolio — Design Spec

**Author:** Parth Kathuria
**Date:** 2026-05-28
**Status:** Approved (pending written-spec review)

## Goal

A fast, static personal portfolio that serves **both** recruiters/hiring managers
(30-second skim) and engineering peers (depth on demand). Primary positioning:
**AI-native developer tooling** (MCP pipelines, LSP, agentic migration, VSCode
extensions), with distributed-systems-at-scale as the credibility anchor.

The site is the primary pitch ("site IS the resume"); a PDF résumé download slot
is wired but disabled by default (see Open Items).

## Non-Goals (YAGNI for v1)

- No blog, CMS, or analytics
- No contact backend / forms (no server-side input surface)
- No live demos, screenshots, or proprietary code (NDA constraint: written case
  studies only, sanitized, no internal names)
- No animations beyond subtle, reduced-motion-respecting transitions
- No i18n
- No multi-page routing (single-page v1; content modeled so multi-page is a
  later refactor, not a rewrite)

## Stack & Hosting

- **Framework:** Astro, static output (`output: 'static'`). Zero/minimal client JS.
- **Styling:** Plain CSS (scoped Astro styles + a small global stylesheet with
  design tokens). No CSS framework.
- **Hosting:** Cloudflare Pages, free tier, `*.pages.dev` subdomain. Custom-domain
  DNS swap reserved for later (no rebuild required).
- **Node:** v20 (confirmed locally: v20.19.4, npm 10.8.2).

## Aesthetic

Minimal / typographic.

- Monochrome base + a single accent color, expressed as CSS custom properties
  (design tokens) so re-theming is one file.
- One variable font (self-hosted, subset) or a strong system font stack. Decision
  deferred to implementation; self-hosting preferred to avoid third-party requests
  and layout shift.
- Whitespace-driven layout, strong type scale.
- Dark mode: `prefers-color-scheme` default + manual toggle persisted to
  `localStorage`. Toggle is the only meaningful client JS (vanilla, no framework),
  inlined to avoid flash-of-incorrect-theme (set theme class before paint).

## Site Structure (single-page scroll, anchored sections)

1. **Hero** — name, "Senior Software Engineer", one-line AI-native-tooling
   positioning, primary CTAs (email `mailto:`, LinkedIn, GitHub).
2. **Selected Work** — 3 case studies rendered inline as cards. Each is its own
   content file (see Content Model). Format per study:
   Problem → Approach → Architecture (text) → Impact (quantified).
   v1 picks:
   - Agentic MCP migration pipeline (Form Conversion Service)
   - DSL + LSP integration (15x clean-build improvement)
   - IoT telemetry pipeline at 650k+ trackers (NEXTracker)
3. **Skills** — grouped: Languages / AI & Tooling / Platforms / Data. Scannable,
   not a logo cloud.
4. **About** — short narrative: 10+ years, platform modernization + developer
   tooling focus, what the engineer optimizes for.
5. **Projects / OSS** — built but hidden behind a build-time flag
   (`SHOW_OSS = false`). Reveals with one flag flip when a public artifact
   (e.g., a toy MCP server / LSP demo) exists.
6. **Contact / Footer** — email, LinkedIn, GitHub. Résumé-PDF download slot wired,
   disabled by default.

## Content Model (key architectural decision)

Astro **content collections**.

- `src/content/work/*.md` — one file per case study.
- Frontmatter schema (Zod-validated by Astro; bad frontmatter fails the build):
  ```
  title: string
  summary: string          # one-line, recruiter-facing
  problem: string
  approach: string
  architecture: string
  impact: string           # quantified
  tags: string[]
  order: number            # controls display order
  draft: boolean (default false)
  ```
- Home page queries the collection and renders inline.
- **Promotion path:** adding `src/pages/work/[slug].astro` that reads the same
  collection yields per-case-study pages with zero content rewrite (Approach A → C).

## Components (small, single-purpose)

- `BaseLayout.astro` — `<head>`, meta/OG/Twitter tags, font loading, theme bootstrap,
  global styles, skip-link.
- `Hero.astro`
- `Section.astro` — semantic `<section>` wrapper with heading + anchor id.
- `WorkCard.astro` — renders one case study.
- `SkillGroup.astro` — one labeled skill group.
- `ThemeToggle.astro` — vanilla-JS dark/light toggle.
- `Footer.astro`

## SEO & Metadata

- `<title>`, meta description.
- Open Graph + Twitter card tags (shared links render correctly for recruiters).
- An OG image (static, generated or hand-made).
- `@astrojs/sitemap` integration; `robots.txt`.
- JSON-LD `Person` schema (name, jobTitle, sameAs: LinkedIn/GitHub, email).
- Canonical URL.

## Accessibility (meets project CLAUDE.md standards)

- Semantic landmarks (`header`, `main`, `nav`, `footer`), one `h1`, logical
  heading order.
- Color contrast ≥ WCAG AA in both themes.
- Fully keyboard-navigable; visible focus states; skip-to-content link.
- `prefers-reduced-motion` respected.
- Alt text on any imagery (OG image, icons via accessible labels).

## Security

- Static site, no backend, no forms → no server-side input surface.
- Contact via `mailto:` and external profile links (`rel="noopener noreferrer"`
  on external links).
- No secrets in repo. No third-party scripts beyond (optionally) self-hosted font.
- CSP meta tag considered (static, restrictive) — implementation-time decision.

## Testing & Acceptance

- `astro check` passes (template/type errors).
- `astro build` passes (content-collection schema validation = content tests).
- Any JS helper (theme toggle persistence) gets a light unit test.
- **Acceptance bar:** Lighthouse ≥ 95 on Performance, Accessibility, Best
  Practices, SEO (local run).
- Manual: keyboard-only pass; dark/light toggle with no flash; OG preview check.

## Repo & Deploy

- Project root: `/Users/pkathuria/dev/portfolio/` (git initialized; `dev` itself
  is not a repo).
- Cloudflare Pages: connect repo or `wrangler pages deploy ./dist`. Build command
  `npm run build`, output `dist/`.

## Open Items / Deferred Decisions

- **Résumé PDF:** slot wired, disabled (`SHOW_RESUME = false`). Enable by dropping
  the PDF in `public/` and flipping the flag. (User chose "site IS the resume";
  risk noted: many ATS/recruiters still expect a PDF.)
- **OSS section:** wired, hidden (`SHOW_OSS = false`) until a public artifact exists.
  Strongly recommended follow-up: build one small public MCP/LSP demo to convert
  the AI-tooling positioning from claim to proof.
- **Font choice:** specific variable font vs system stack — implementation-time.
- **Custom domain:** deferred; `*.pages.dev` for now.
