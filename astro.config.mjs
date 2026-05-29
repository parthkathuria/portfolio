// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Resolve a short commit hash at build time: Cloudflare Pages provides
// CF_PAGES_COMMIT_SHA; locally fall back to git; otherwise "local".
let commit = 'local';
try {
  commit = (process.env.CF_PAGES_COMMIT_SHA || execSync('git rev-parse --short HEAD').toString().trim()).slice(0, 7);
} catch {
  /* no git available — keep "local" */
}

// Update `site` to the final Cloudflare Pages URL or custom domain before deploy.
export default defineConfig({
  site: 'https://parthkathuria.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    define: { __COMMIT__: JSON.stringify(commit) },
  },
});
