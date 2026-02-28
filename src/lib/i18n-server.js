import fs from 'fs';
import path from 'path';

export async function getTranslations(lang = 'en') {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

// Simple helper to get a nested key like "hero.title"
export function t(translations, key, fallback = '') {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return fallback || key;
    }
  }
  
  return result;
}
