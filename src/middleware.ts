import {defineMiddleware} from "astro/middleware";

const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'jp'];

export const onRequest = defineMiddleware((context, next) => {
    const lang = context.request.headers.get("Accept-Language");
    const [langCode] = lang?.split(",")?.[0]?.split("-") || [];
    
    const currentPath = new URL(context.request.url).pathname;
    const currentLang = currentPath.split('/')[1];

    // Si la ruta no tiene idioma y hay un idioma detectado, redirigir
    if (!currentLang && langCode && SUPPORTED_LANGUAGES.includes(langCode)) {
        // Extraer la ruta sin el idioma actual
        const pathParts = currentPath.split('/');
        const newPath = `/${langCode}/${pathParts.slice(1).join('/')}`;
        
        return new Response(null, {
            status: 302,
            headers: {
                'Location': newPath
            }
        });
    }

    // Si la ruta tiene un idioma válido, continuar normalmente
    if (currentLang && SUPPORTED_LANGUAGES.includes(currentLang)) {
        return next();
    }

    // Si la ruta no tiene un idioma válido y no hay idioma detectado, usar español por defecto
    if (!currentLang && !langCode) {
        const pathParts = currentPath.split('/');
        const newPath = `/es/${pathParts.slice(1).join('/')}`;
        
        return new Response(null, {
            status: 302,
            headers: {
                'Location': newPath
            }
        });
    }

    // Si no se reconoce el idioma, continuar con el flujo normal
    return next();
});