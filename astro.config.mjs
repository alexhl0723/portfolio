// @ts-check
import { defineConfig,envField } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwind()],
  },

  env:{
      schema:{
        MONGODB_URI: envField.string({ context: 'server', access:'secret' }),
        DB_NAME: envField.string({ context: 'server', access:'secret' })
      }
    },

  output: "server",
  adapter: vercel(),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ja", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  
});