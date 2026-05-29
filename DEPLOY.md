# Deploy — Cloudflare Pages

## One-time
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Environment variables: set **`NODE_VERSION` = `20`** (this project pins Astro 4.x, which supports Node 18/20; the repo was built on Node 20).
5. Deploy. You get `https://<project>.pages.dev`.

## Before the first deploy
- Set the final URL in two places so canonical/sitemap/OG tags are correct:
  - `astro.config.mjs` → `site`
  - `public/robots.txt` → `Sitemap:` line

## Registry note
Do **not** commit a project `.npmrc`. A corporate registry in a global `~/.npmrc`
will not affect Cloudflare's clean build environment (it uses the public npm
registry), and that is what we want.

## CLI alternative (no GitHub required)
```bash
npm install -D wrangler
npm run build
npx wrangler pages deploy ./dist
```

## Enabling deferred features
- **Résumé PDF:** drop `Parth_Kathuria_Resume.pdf` into `public/`, then set
  `SHOW_RESUME = true` in `src/config.ts`. Links appear in the hero and footer.
- **OSS section:** set `SHOW_OSS = true` in `src/config.ts` once a public repo exists.

## Regenerating the OG image (`public/og.png`, 1200×630)
The OG image was rendered from a small HTML file via headless Chrome. To change it,
recreate an HTML card and run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --window-size=1200,630 \
  --screenshot="$(pwd)/public/og.png" "file://$(pwd)/og-source.html"
```

## Custom domain (later)
Cloudflare Pages → project → Custom domains → add domain (free TLS). Then update
`site` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`.

## Verification gates (run before deploying)
```bash
npm run build          # must complete; validates content frontmatter
npx astro check        # expect 0 errors / 0 warnings / 0 hints
npm test               # theme unit tests: 4 passed
```
Acceptance target: Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.
