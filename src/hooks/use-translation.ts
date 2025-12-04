import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';

type TranslationPath = 
  | 'nav'
  | 'hero'
  | 'about'
  | 'programs'
  | 'whyChooseUs'
  | 'testimonials'
  | 'gallery'
  | 'footer'
  | 'finalCTA'
  | 'common'
  | 'application';

type TranslationKeys<T extends TranslationPath> = keyof typeof translations.uz[T];

export const useTranslation = () => {
  const { languageCode } = useLanguage();
  
  const t = <T extends TranslationPath>(
    path: T,
    key: TranslationKeys<T>
  ): string => {
    const langTranslations = translations[languageCode as 'uz' | 'ru' | 'en'] || translations.uz;
    const pathTranslations = langTranslations[path] as Record<string, string>;
    return pathTranslations?.[key as string] || translations.uz[path]?.[key as string] || '';
  };

  return { t };
};

