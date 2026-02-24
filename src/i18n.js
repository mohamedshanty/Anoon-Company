'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../public/locales/en/common.json';
import arTranslation from '../public/locales/ar/common.json';

// تأكد من عدم إعادة التهيئة
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          common: enTranslation
        },
        ar: {
          common: arTranslation
        }
      },
      defaultNS: 'common',
      ns: ['common'],
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development', // تفعيل debug في وضع التطوير
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie'],
      },
      react: {
        useSuspense: false, // مهم لمنع مشاكل التحميل
      }
    });
}

export default i18n;