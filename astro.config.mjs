// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to the final Cloudflare Pages URL or custom domain before deploy.
export default defineConfig({
  site: 'https://parthkathuria.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});
