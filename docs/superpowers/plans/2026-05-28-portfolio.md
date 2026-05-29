# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast static Astro portfolio (single-page, minimal/typographic) for Parth Kathuria, deployable to Cloudflare Pages.

**Architecture:** Astro static output. Case studies are content-collection Markdown files rendered inline on one page (promotable to per-page routes later). One small vanilla-JS module handles dark/light theme (the only client JS); it is unit-tested. Build + `astro check` + Lighthouse are the verification gates.

**Tech Stack:** Astro 5, TypeScript, plain CSS with custom-property design tokens, `@astrojs/sitemap`, Vitest + jsdom (theme logic only), Cloudflare Pages.

**Project root:** `/Users/pkathuria/dev/portfolio/` (git already initialized; spec committed).

---

## File Structure

```
portfolio/
  astro.config.mjs           # static output, site URL, sitemap integration
  package.json
  tsconfig.json
  vitest.config.ts           # jsdom env for theme test
  src/
    config.ts                # feature flags: SHOW_OSS, SHOW_RESUME; site constants
    content/
      config.ts              # content-collection schema (work)
      work/
        mcp-migration-pipeline.md
        dsl-lsp.md
        iot-telemetry.md
    scripts/
      theme.ts               # testable theme logic (getInitialTheme/applyTheme/toggleTheme)
    layouts/
      BaseLayout.astro       # head, meta/OG/Twitter, JSON-LD, theme bootstrap, global css link
    components/
      Hero.astro
      Section.astro
      WorkCard.astro
      SkillGroup.astro
      ThemeToggle.astro
      Footer.astro
    styles/
      global.css             # design tokens + base typography + layout
    pages/
      index.astro            # assembles all sections
    data/
      skills.ts              # skill groups data
  public/
    robots.txt
    og.png                   # OG image (placeholder generated in Task 8)
  tests/
    theme.test.ts
```

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (temporary placeholder)

- [ ] **Step 1: Scaffold a minimal Astro project non-interactively**

Run from `/Users/pkathuria/dev/portfolio`:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --skip-houston --typescript strict
```
Expected: creates `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`. If it refuses because the directory is non-empty, answer to keep existing files; `docs/` and `.git/` must remain.

- [ ] **Step 2: Install dependencies and the sitemap integration**

```bash
npm install
npm install @astrojs/sitemap
npm install -D vitest jsdom @vitest/coverage-v8
```
Expected: `node_modules/` populated, no errors.

- [ ] **Step 3: Configure Astro for static output + site URL + sitemap**

Replace `astro.config.mjs` with:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to the final Cloudflare Pages URL or custom domain before deploy.
export default defineConfig({
  site: 'https://parthkathuria.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});
```

- [ ] **Step 4: Verify the dev build works**

Run: `npm run build`
Expected: PASS — "Complete!" with `dist/` produced. (Placeholder index is fine for now.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with sitemap integration"
```

---

### Task 2: Theme logic module (TDD — the only unit-tested code)

**Files:**
- Create: `src/scripts/theme.ts`
- Test: `tests/theme.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Add vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
```
Add to `package.json` `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 2: Write the failing test**

Create `tests/theme.test.ts`:
```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInitialTheme, applyTheme, toggleTheme, STORAGE_KEY } from '../src/scripts/theme';

function mockMatchMedia(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: prefersDark && q.includes('dark'),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('uses stored theme when present', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    mockMatchMedia(true);
    expect(getInitialTheme()).toBe('light');
  });

  it('falls back to OS preference when nothing stored', () => {
    mockMatchMedia(true);
    expect(getInitialTheme()).toBe('dark');
    mockMatchMedia(false);
    expect(getInitialTheme()).toBe('light');
  });

  it('applyTheme sets the data-theme attribute', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggleTheme flips, persists, and returns the new theme', () => {
    applyTheme('light');
    const next = toggleTheme();
    expect(next).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../src/scripts/theme`.

- [ ] **Step 4: Implement the module**

Create `src/scripts/theme.ts`:
```ts
export type Theme = 'light' | 'dark';
export const STORAGE_KEY = 'theme';

export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
  return next;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS — 4 passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add tested theme logic module"
```

---

### Task 3: Design tokens + global stylesheet

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write the global stylesheet with tokens for both themes**

Create `src/styles/global.css`:
```css
:root {
  --bg: #ffffff;
  --fg: #18181b;
  --muted: #52525b;
  --border: #e4e4e7;
  --accent: #2563eb;
  --maxw: 46rem;
  --space: 1.5rem;
  --font: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
:root[data-theme="dark"] {
  --bg: #0a0a0a;
  --fg: #f4f4f5;
  --muted: #a1a1aa;
  --border: #27272a;
  --accent: #60a5fa;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 1.25rem; }
a { color: var(--accent); text-underline-offset: 2px; }
h1, h2, h3 { line-height: 1.2; letter-spacing: -0.02em; }
h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 .5rem; }
h2 { font-size: 1.5rem; margin: 3rem 0 1rem; }
.muted { color: var(--muted); }
.skip-link {
  position: absolute; left: -999px;
}
.skip-link:focus {
  left: 1rem; top: 1rem; background: var(--bg); color: var(--fg);
  padding: .5rem .75rem; border: 1px solid var(--border); border-radius: 6px; z-index: 10;
}
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add design tokens and global stylesheet"
```

---

### Task 4: Site config + content-collection schema + case studies

**Files:**
- Create: `src/config.ts`, `src/content/config.ts`
- Create: `src/content/work/mcp-migration-pipeline.md`, `dsl-lsp.md`, `iot-telemetry.md`

- [ ] **Step 1: Add site config / feature flags**

Create `src/config.ts`:
```ts
export const SITE = {
  name: 'Parth Kathuria',
  title: 'Senior Software Engineer',
  tagline: 'I build AI-native developer tooling — MCP pipelines, language servers, and the platforms that ship them.',
  email: 'parthkathuria09@gmail.com',
  linkedin: 'https://linkedin.com/in/parthkathuria',
  github: 'https://github.com/parthkathuria',
  description:
    'Parth Kathuria — Senior Software Engineer specializing in AI-native developer tooling, MCP pipelines, LSP, and event-driven platforms.',
};
export const SHOW_OSS = false;
export const SHOW_RESUME = false;
export const RESUME_PATH = '/Parth_Kathuria_Resume.pdf';
```

- [ ] **Step 2: Define the content-collection schema**

Create `src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    architecture: z.string(),
    impact: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
```

- [ ] **Step 3: Write case study 1 — MCP migration pipeline**

Create `src/content/work/mcp-migration-pipeline.md`:
```md
---
title: Agentic AI Migration Pipeline
summary: Cut medium-complexity form migration from 1–2 weeks to 1–2 days with a hybrid deterministic + AI workflow.
problem: A company-wide modernization program needed to migrate thousands of complex forms off a legacy format. Pure manual migration took 1–2 weeks per medium-complexity form and did not scale to the program's timeline.
approach: Working directly with the engineers who do migrations, I decomposed the work into task-specific prompts with iterative self-correction loops, pairing deterministic conversion with targeted AI enhancement so each step stayed verifiable.
architecture: A deterministic conversion stage produces a structured intermediate, an AI enhancement stage improves it, an independent AI judge scores output quality against explicit criteria, and an automated feedback loop re-runs flagged items. Orchestrated over the Model Context Protocol (MCP) so tools and context are composable.
impact: Reduced migration time for medium-complexity forms from 1–2 weeks to 1–2 days, and made quality measurable rather than subjective via the independent judge stage.
tags: ["MCP", "Agentic AI", "Developer Tooling", "Platform Modernization"]
order: 1
---

The hard part was not generating output — it was *trusting* it. The independent
judge stage and feedback loop are what made an AI step safe to put in a
production migration path: every artifact is scored and bad ones are
automatically reworked before a human sees them.
```

- [ ] **Step 4: Write case study 2 — DSL + LSP**

Create `src/content/work/dsl-lsp.md`:
```md
---
title: Domain-Specific Language with LSP Integration
summary: Replaced a legacy XML architecture with an AI-agent-ready DSL, delivering a 15x faster clean build (60s → 4s).
problem: A form-conversion service was built on a verbose legacy XML architecture that was slow to build, hard for both humans and AI agents to author, and lacked editor tooling.
approach: I designed and productionized a domain-specific language to replace the XML, then built first-class editor support around it so authors get real-time feedback instead of failing late in a build.
architecture: A purpose-built DSL with a compiler/toolchain, fronted by full Language Server Protocol (LSP) integration that provides diagnostics, validation, and editor intelligence in any LSP-capable IDE. The language was shaped to be equally legible to AI agents and humans.
impact: 15x improvement in clean build times — from 60 seconds to 4 seconds — plus an authoring surface that AI agents can target directly.
tags: ["LSP", "Compilers / DSL", "Developer Experience", "AI-Ready Architecture"]
order: 2
---

Designing the language for *two* consumers — humans and AI agents — drove the
syntax decisions. LSP integration meant the same validation logic powered both
the editor experience and the build, so there was one source of truth for what
"valid" means.
```

- [ ] **Step 5: Write case study 3 — IoT telemetry**

Create `src/content/work/iot-telemetry.md`:
```md
---
title: Telemetry Pipeline at 650k+ Devices
summary: Built a distributed pipeline collecting real-time telemetry from 650,000+ solar trackers worldwide.
problem: A global solar fleet of 650,000+ trackers needed real-time monitoring and remote control, with telemetry reliable enough to drive operational decisions and a proprietary predictive tracking algorithm.
approach: I built the data pipeline end to end — ingestion, storage, and a monitoring/configuration dashboard for internal teams and customers — and designed the IoT data-management device that anchors collection at the edge.
architecture: Edge devices stream telemetry into a scalable distributed pipeline backed by a time-series database, migrated from a single instance to a VM + Docker hybrid cluster at 99% uptime. A REST API exposes metrics to analytics consumers; Jenkins CI/CD automates build, test, and deploy across the toolchain.
impact: Real-time visibility and control across 650,000+ devices, 60% faster deployment of the predictive tracking algorithm via automated configuration, and a database migration completed at 99% uptime.
tags: ["Distributed Systems", "IoT", "Time-Series", "AWS", "CI/CD"]
order: 3
---

This is the systems-at-scale counterweight to the tooling work: telemetry from
hundreds of thousands of devices is unforgiving about backpressure, partial
failure, and schema drift. The hybrid-cluster migration at 99% uptime was the
proof the pipeline could evolve without a maintenance window the fleet couldn't
afford.
```

- [ ] **Step 6: Verify schema validation by building**

Run: `npm run build`
Expected: PASS. (If any frontmatter is malformed, the build fails with a Zod error — that is the content test.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add site config and work content collection with 3 case studies"
```

---

### Task 5: Skills data + presentational components

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/components/Section.astro`, `SkillGroup.astro`, `WorkCard.astro`, `Hero.astro`, `Footer.astro`, `ThemeToggle.astro`

- [ ] **Step 1: Add skills data**

Create `src/data/skills.ts`:
```ts
export interface SkillGroupData {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroupData[] = [
  { label: 'Languages', items: ['Java', 'Go', 'Python', 'C/C++', 'C#', 'TypeScript', 'JavaScript', 'Node.js', 'Bash'] },
  { label: 'AI & Tooling', items: ['Model Context Protocol (MCP)', 'Language Server Protocol (LSP)', 'VSCode Extension API', 'Claude Code', 'Cursor', 'GPT Codex'] },
  { label: 'Platforms', items: ['AWS (Lambda, ECS, EC2, EventBridge, CloudFormation)', 'Azure', 'Docker', 'GraalVM', 'Jenkins', 'ArgoCD', 'Git'] },
  { label: 'Data', items: ['PostgreSQL', 'InfluxDB', 'MSSQL', 'MySQL', 'Redis'] },
  { label: 'Frameworks', items: ['Spring MVC', 'React', 'Django', 'Express.js', 'Angular.js'] },
];
```

- [ ] **Step 2: Add Section wrapper**

Create `src/components/Section.astro`:
```astro
---
interface Props { id: string; heading: string; }
const { id, heading } = Astro.props;
---
<section id={id} class="container">
  <h2>{heading}</h2>
  <slot />
</section>
```

- [ ] **Step 3: Add SkillGroup**

Create `src/components/SkillGroup.astro`:
```astro
---
import type { SkillGroupData } from '../data/skills';
interface Props { group: SkillGroupData; }
const { group } = Astro.props;
---
<div class="group">
  <h3>{group.label}</h3>
  <ul>
    {group.items.map((i) => <li>{i}</li>)}
  </ul>
</div>
<style>
  .group { margin-bottom: 1.5rem; }
  h3 { font-size: .85rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin: 0 0 .5rem; }
  ul { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; padding: 0; margin: 0; }
  li { border: 1px solid var(--border); border-radius: 999px; padding: .25rem .7rem; font-size: .85rem; }
</style>
```

- [ ] **Step 4: Add WorkCard**

Create `src/components/WorkCard.astro`:
```astro
---
interface Props {
  title: string; summary: string; problem: string; approach: string;
  architecture: string; impact: string; tags: string[];
}
const { title, summary, problem, approach, architecture, impact, tags } = Astro.props;
---
<article class="card">
  <h3>{title}</h3>
  <p class="summary">{summary}</p>
  <dl>
    <dt>Problem</dt><dd>{problem}</dd>
    <dt>Approach</dt><dd>{approach}</dd>
    <dt>Architecture</dt><dd>{architecture}</dd>
    <dt>Impact</dt><dd>{impact}</dd>
  </dl>
  <ul class="tags">{tags.map((t) => <li>{t}</li>)}</ul>
  <slot />
</article>
<style>
  .card { border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
  h3 { margin: 0 0 .25rem; font-size: 1.25rem; }
  .summary { color: var(--muted); margin: 0 0 1rem; }
  dl { margin: 0; }
  dt { font-size: .75rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-top: .75rem; }
  dd { margin: .15rem 0 0; }
  .tags { display: flex; flex-wrap: wrap; gap: .4rem; list-style: none; padding: 0; margin: 1rem 0 0; }
  .tags li { font-size: .75rem; font-family: var(--mono); color: var(--accent); }
  .tags li::before { content: "#"; opacity: .6; }
</style>
```

- [ ] **Step 5: Add Hero**

Create `src/components/Hero.astro`:
```astro
---
import { SITE, SHOW_RESUME, RESUME_PATH } from '../config';
---
<header class="hero container">
  <h1>{SITE.name}</h1>
  <p class="role muted">{SITE.title}</p>
  <p class="tagline">{SITE.tagline}</p>
  <nav class="cta" aria-label="Primary contact">
    <a href={`mailto:${SITE.email}`}>Email</a>
    <a href={SITE.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>
    <a href={SITE.github} rel="noopener noreferrer" target="_blank">GitHub</a>
    {SHOW_RESUME && <a href={RESUME_PATH}>Résumé (PDF)</a>}
  </nav>
</header>
<style>
  .hero { padding: 4rem 1.25rem 2rem; }
  .role { font-size: 1.1rem; margin: 0 0 1.25rem; }
  .tagline { font-size: 1.25rem; max-width: 34rem; margin: 0 0 1.5rem; }
  .cta { display: flex; flex-wrap: wrap; gap: 1rem; }
  .cta a { font-weight: 600; }
</style>
```

- [ ] **Step 6: Add Footer**

Create `src/components/Footer.astro`:
```astro
---
import { SITE, SHOW_RESUME, RESUME_PATH } from '../config';
const year = new Date().getFullYear();
---
<footer class="container">
  <nav aria-label="Footer links">
    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    <a href={SITE.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>
    <a href={SITE.github} rel="noopener noreferrer" target="_blank">GitHub</a>
    {SHOW_RESUME && <a href={RESUME_PATH}>Résumé (PDF)</a>}
  </nav>
  <p class="muted">© {year} {SITE.name}</p>
</footer>
<style>
  footer { padding: 3rem 1.25rem 4rem; border-top: 1px solid var(--border); margin-top: 4rem; }
  nav { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }
</style>
```

- [ ] **Step 7: Add ThemeToggle**

Create `src/components/ThemeToggle.astro`:
```astro
<button id="theme-toggle" type="button" aria-label="Toggle color theme">◐</button>
<script>
  import { toggleTheme } from '../scripts/theme';
  document.getElementById('theme-toggle')?.addEventListener('click', () => toggleTheme());
</script>
<style>
  #theme-toggle {
    position: fixed; top: 1rem; right: 1rem; z-index: 5;
    background: var(--bg); color: var(--fg); border: 1px solid var(--border);
    border-radius: 999px; width: 2.5rem; height: 2.5rem; font-size: 1.1rem; cursor: pointer;
  }
</style>
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add skills data and presentational components"
```

---

### Task 6: BaseLayout with meta, OG, and JSON-LD

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write the layout**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';
import { SITE } from '../config';
interface Props { title?: string; }
const { title = `${SITE.name} — ${SITE.title}` } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).href;
const ogImage = new URL('/og.png', Astro.site).href;
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.title,
  email: `mailto:${SITE.email}`,
  url: Astro.site?.href,
  sameAs: [SITE.linkedin, SITE.github],
};
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={SITE.description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={SITE.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={SITE.description} />
    <meta name="twitter:image" content={ogImage} />
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
    <!-- Theme bootstrap: runs before paint to avoid flash of wrong theme -->
    <script is:inline>
      (function () {
        try {
          var s = localStorage.getItem('theme');
          var t = (s === 'light' || s === 'dark')
            ? s
            : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.setAttribute('data-theme', t);
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to content</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout with SEO meta, OG tags, and JSON-LD"
```

---

### Task 7: Assemble the home page

**Files:**
- Modify/replace: `src/pages/index.astro`

- [ ] **Step 1: Write the index page**

Replace `src/pages/index.astro` with:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
import WorkCard from '../components/WorkCard.astro';
import SkillGroup from '../components/SkillGroup.astro';
import ThemeToggle from '../components/ThemeToggle.astro';
import Footer from '../components/Footer.astro';
import { SKILLS } from '../data/skills';
import { SHOW_OSS } from '../config';

const work = (await getCollection('work', ({ data }) => !data.draft))
  .sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout>
  <ThemeToggle />
  <Hero />
  <main id="main">
    <Section id="work" heading="Selected Work">
      {work.map((w) => (
        <WorkCard
          title={w.data.title}
          summary={w.data.summary}
          problem={w.data.problem}
          approach={w.data.approach}
          architecture={w.data.architecture}
          impact={w.data.impact}
          tags={w.data.tags}
        />
      ))}
    </Section>

    <Section id="skills" heading="Skills">
      {SKILLS.map((g) => <SkillGroup group={g} />)}
    </Section>

    <Section id="about" heading="About">
      <p>
        Senior software engineer with 10+ years building platform modernization
        programs, developer tooling, and event-driven systems. I focus on making
        complex migrations safe and fast — pairing deterministic engineering with
        AI where it earns its place, and measuring quality instead of trusting it.
      </p>
    </Section>

    {SHOW_OSS && (
      <Section id="oss" heading="Open Source">
        <p class="muted">Selected public projects — coming soon.</p>
      </Section>
    )}
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Verify build and type-check**

Run: `npm run build && npx astro check`
Expected: PASS — 0 errors. (Astro auto-runs `astro sync` for content types during build.)

- [ ] **Step 3: Manual visual check**

Run: `npm run dev` and open the printed localhost URL.
Verify: hero renders, three case studies in order, skills grouped, theme toggle flips light/dark with no flash on reload, keyboard Tab reveals the skip link.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble single-page home with work, skills, and about"
```

---

### Task 8: SEO assets, verification, and deploy docs

**Files:**
- Create: `public/robots.txt`, `public/og.png`
- Create: `DEPLOY.md`

- [ ] **Step 1: Add robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://parthkathuria.pages.dev/sitemap-index.xml
```

- [ ] **Step 2: Add an OG image**

Provide a 1200×630 PNG at `public/og.png`. Quick generation if no design asset exists:
```bash
# Requires ImageMagick. If unavailable, create any 1200x630 PNG named og.png.
magick -size 1200x630 xc:'#0a0a0a' \
  -gravity center -fill '#f4f4f5' -pointsize 64 \
  -annotate +0-30 'Parth Kathuria' \
  -pointsize 32 -fill '#a1a1aa' -annotate +0+50 'Senior Software Engineer' \
  public/og.png
```

- [ ] **Step 3: Full verification build**

Run: `npm run build && npx astro check && npm test`
Expected: build PASS, `astro check` 0 errors, tests 4 passed. Confirm `dist/sitemap-index.xml` and `dist/og.png` exist.

- [ ] **Step 4: Lighthouse check (acceptance bar ≥95)**

Run:
```bash
npm run preview &
sleep 3
npx lighthouse http://localhost:4321 --quiet --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./lighthouse.json
```
Expected: all four categories ≥ 0.95. If accessibility < 0.95, fix contrast/landmarks before proceeding. Stop the preview server afterward. Delete `lighthouse.json` (do not commit).

- [ ] **Step 5: Write deploy docs**

Create `DEPLOY.md`:
```md
# Deploy — Cloudflare Pages

## One-time
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select repo.
3. Build settings: Framework preset **Astro**, build command `npm run build`, output dir `dist`.
4. Deploy. You get `https://<project>.pages.dev`.

## Before first deploy
- Set the final URL in `astro.config.mjs` (`site`) and `public/robots.txt` (Sitemap line).

## CLI alternative
```bash
npm install -D wrangler
npm run build
npx wrangler pages deploy ./dist
```

## Enabling deferred features
- Résumé: drop `Parth_Kathuria_Resume.pdf` into `public/`, set `SHOW_RESUME = true` in `src/config.ts`.
- OSS section: set `SHOW_OSS = true` once a public repo exists.

## Custom domain
Cloudflare Pages → project → Custom domains → add domain (free TLS). Update `site`/robots afterward.
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO assets, OG image, and deploy docs"
```

---

## Self-Review

**Spec coverage:**
- Astro static + Cloudflare → Task 1, Task 8. ✓
- Minimal/typographic + dark mode no-flash → Task 3, Task 6 (inline bootstrap), Task 5 (toggle). ✓
- Single-page sections (Hero/Work/Skills/About/OSS/Contact) → Task 7. ✓
- Case studies as content collection, promotable → Task 4 (schema + files), Task 7 (query). ✓
- OSS slot flagged off / résumé slot flagged off → Task 4 (`SHOW_OSS`/`SHOW_RESUME`), Task 5 (Hero/Footer conditionals). ✓
- SEO: OG/Twitter/sitemap/JSON-LD/robots/canonical → Task 1 (sitemap), Task 6 (meta/JSON-LD), Task 8 (robots/og). ✓
- Accessibility AA, landmarks, skip link, reduced motion → Task 3 (CSS), Task 6 (skip link/lang), Task 8 (Lighthouse gate). ✓
- Security: no backend, `rel=noopener` external links → Task 5 (links). ✓
- Testing: theme unit test, build/check, Lighthouse ≥95 → Task 2, Task 7, Task 8. ✓

**Placeholder scan:** No TBD/TODO; all code blocks complete; OG image step provides a real generation command with a stated fallback.

**Type consistency:** `STORAGE_KEY`/`getInitialTheme`/`applyTheme`/`toggleTheme` consistent between Task 2 module and test. `WorkCard` prop names match frontmatter fields used in Task 7. `SkillGroupData` shape consistent between Task 5 data and component. `SHOW_OSS`/`SHOW_RESUME`/`RESUME_PATH` consistent across `config.ts`, Hero, Footer, index.
