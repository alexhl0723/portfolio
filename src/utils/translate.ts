// src/utils/useTranslation.ts
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import jp from '../i18n/jp.json';
import fr from '../i18n/fr.json';

export function translate(pathname: string) {
  let locale: 'en' | 'es' | 'jp' | 'fr' = 'es'; // idioma por defecto

  if (pathname.startsWith('/en')) {
    locale = 'en';
  } else if (pathname.startsWith('/jp')) {
    locale = 'jp';
  } else if (pathname.startsWith('/fr')) {
    locale = 'fr';
  }

  const t = locale === 'en' ? en : locale === 'jp' ? jp : locale === 'fr' ? fr : es;

  return { locale, t };
}
