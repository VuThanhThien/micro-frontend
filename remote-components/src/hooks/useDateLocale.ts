import { Locale } from 'date-fns';
import { enUS as en } from 'date-fns/locale';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const locales: { [key: string]: Locale } = { en, fr };

const useDateLocale = (): Locale | undefined => {
  const [locale, setLocale] = useState<Locale | undefined>(undefined);
  const { i18n } = useTranslation();

  useEffect(() => {
    setLocale(locales[i18n.language]);
  }, [i18n.language]);

  return locale;
};
export default useDateLocale;
