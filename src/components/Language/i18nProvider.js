import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from "./en.json"
import es from "./es.json";

const translations = { en, es }; 

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale],
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'es', name: 'Español' } 
    ],
);
