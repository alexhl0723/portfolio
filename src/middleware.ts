import { defineMiddleware } from 'astro/middleware';

const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'ja'];

function getPreferredLang(request: Request): string {
  const accept = request.headers.get('accept-language');
  if (!accept) return 'es';

  const langs = accept
    .split(',')
    .map((lang) => lang.split(';')[0].trim().split('-')[0]);

  for (const lang of langs) {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      return lang;
    }
  }

  return 'es';
}

export const onRequest = defineMiddleware(({ request }, next) => {
  const url = new URL(request.url);

  // ✅ Ignorar rutas API como /api/contact
  if (url.pathname.startsWith('/api')) {
    return next();
  }

  const pathParts = url.pathname.split('/').filter(Boolean);
  const currentLang = pathParts[0];

  if (currentLang && SUPPORTED_LANGUAGES.includes(currentLang)) {
    return next();
  }

  // ✅ Si no hay idioma en la URL, redirigir al preferido o 'es'
  const preferredLang = getPreferredLang(request);
  const newPath = `/${preferredLang}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: newPath,
    },
  });
});
