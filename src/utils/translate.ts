// src/utils/useTranslation.ts
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import ja from '../i18n/ja.json';
import fr from '../i18n/fr.json';

export function translate(pathname: string) {
  let locale: 'en' | 'es' | 'ja' | 'fr' = 'es'; // idioma por defecto

  if (pathname.startsWith('/en')) {
    locale = 'en';
  } else if (pathname.startsWith('/ja')) {
    locale = 'ja';
  } else if (pathname.startsWith('/fr')) {
    locale = 'fr';
  }

  const t = locale === 'en' ? en : locale === 'ja' ? ja : locale === 'fr' ? fr : es;

  return { locale, t };
}
