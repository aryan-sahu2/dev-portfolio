// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dev-portfolio-4d2.pages.dev',
  vite: {
    plugins: [tailwind()],
  },
});
