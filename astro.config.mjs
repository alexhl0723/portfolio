// @ts-check
import { defineConfig,envField } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
      plugins: [tailwind()],
  },

  env:{
      schema:{
        MONGODB_URI: envField.string({ context: 'server', access:'secret' }),
        DB_NAME: envField.string({ context: 'server', access:'secret' }),
        RESEND_API_KEY: envField.string({ context: 'server', access:'secret' }),
      }
    },

  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ja", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

});