import { defineMiddleware } from "astro/middleware";

const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'ja'];

export const onRequest = defineMiddleware((context, next) => {
    // Obtener el encabezado Accept-Language
    const acceptLanguage = context.request.headers.get("Accept-Language") || "";
    
    // Extraer el código de idioma preferido
    let preferredLang = null;
    
    // Primero intentamos encontrar una coincidencia exacta
    for (const lang of acceptLanguage.split(',')) {
        const [langCode] = lang.trim().split(';')[0].split('-');
        if (SUPPORTED_LANGUAGES.includes(langCode)) {
            preferredLang = langCode;
            break;
        }
    }
    
    // URL actual y partes de la ruta
    const url = new URL(context.request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const currentLang = pathParts[0];
    
    // Si la ruta ya tiene un idioma válido, continuar normalmente
    if (currentLang && SUPPORTED_LANGUAGES.includes(currentLang)) {
        return next();
    }
    
    // Si no hay idioma en la URL pero detectamos uno válido, redirigir
    if (preferredLang) {
        const newPath = `/${preferredLang}${url.pathname.startsWith('/') ? url.pathname : '/' + url.pathname}`;
        return new Response(null, {
            status: 302,
            headers: {
                'Location': newPath
            }
        });
    }
    
    // Si no se detectó ningún idioma válido, usar español por defecto
    const newPath = `/es${url.pathname.startsWith('/') ? url.pathname : '/' + url.pathname}`;
    return new Response(null, {
        status: 302,
        headers: {
            'Location': newPath
        }
    });
});