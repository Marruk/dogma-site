// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://dogma-utrecht.nl',
  // One URL shape per page (/agenda/), so search engines never see duplicates.
  trailingSlash: 'always',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
