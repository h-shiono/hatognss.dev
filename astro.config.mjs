import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hatognss.dev',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    /*
     * Dual themes with defaultColor:false make Shiki emit --shiki-light /
     * --shiki-dark custom properties instead of a hard-coded inline
     * background-color, so a code block can follow the site palette in both
     * colour schemes (see .astro-code in global.css).
     */
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
