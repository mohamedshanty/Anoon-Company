"use client";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n.client';

export function I18nProvider({ children }) {
  const { i18n, ready } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  if (!ready) {
    return null;
  }

  return children;
}