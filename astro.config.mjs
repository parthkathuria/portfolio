// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Resolve a short commit hash at build time: Cloudflare Pages provides
// CF_PAGES_COMMIT_SHA; GitHub Actions provides GITHUB_SHA; else fall back to git.
let commit = 'local';
try {
  commit = (
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    execSync('git rev-parse --short HEAD').toString().trim()
  ).slice(0, 7);
} catch {
  /* no git available — keep "local" */
}

// GitHub Pages serves this project repo at /portfolio; Cloudflare serves at root.
// The GitHub Actions workflow sets GITHUB_PAGES=true so one codebase builds both.
const onGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: onGitHubPages ? 'https://parthkathuria.github.io' : 'https://parthkathuria.pages.dev',
  base: onGitHubPages ? '/portfolio/' : '/',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    define: { __COMMIT__: JSON.stringify(commit) },
  },
});
