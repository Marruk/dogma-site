// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap. Until
  // dogma-utrecht.nl points to GitHub, the site lives at the test address
  // https://marruk.github.io/dogma-site/. To switch, set site to
  // 'https://dogma-utrecht.nl' and remove base.
  site: 'https://marruk.github.io',
  base: '/dogma-site',
  // One URL shape per page (/agenda/), so search engines never see duplicates.
  trailingSlash: 'always',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
