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

function getPathWithoutLang(pathname: string): { lang: string; path: string } {
  const parts = pathname.split('/').filter(Boolean);
  const maybeLang = parts[0];
  
  if (SUPPORTED_LANGUAGES.includes(maybeLang)) {
    return {
      lang: maybeLang,
      path: '/' + parts.slice(1).join('/')
    };
  }
  
  return {
    lang: 'es', // idioma por defecto
    path: pathname
  };
}

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  const { pathname } = url;

  // Ignorar rutas API
  if (pathname.startsWith('/api/')) {
    return next();
  }

  // Ignorar archivos estáticos
  if (pathname.includes('.')) {
    return next();
  }

  // Manejar redirección de la raíz
  if (pathname === '/') {
    const preferredLang = getPreferredLang(request);
    return new Response(null, {
      status: 302,
      headers: { Location: `/${preferredLang}/` },
    });
  }

  // Obtener el idioma de la URL actual
  const { lang, path } = getPathWithoutLang(pathname);
  const is404 = path.endsWith('/404');

  // Si es la ruta 404, permitir que se muestre
  if (is404) {
    return next();
  }

  // Verificar si la ruta existe
  const response = await next();
  
  // Si la ruta no existe, redirigir al 404 con el idioma actual
  if (response.status === 404) {
    return new Response(null, {
      status: 302,
      headers: { Location: `/${lang}/404` },
    });
  }

  // Redirigir a la versión con barra final si es necesario
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    return new Response(null, {
      status: 302,
      headers: { Location: `${pathname}/` },
    });
  }

  return response;
});
