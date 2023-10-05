// in src/i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import fr from 'ra-language-french';
import es from 'ra-language-spanish';

const translations = { en, fr, es }; 

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale],
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
        { locale: 'es', name: 'Español' } 
    ],
);
