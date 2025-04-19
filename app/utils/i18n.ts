import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

// استيراد ملفات اللغة
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';

// تعريف أنواع للنصوص
type TranslationResources = {
  translation: typeof en;
};

const resources: Record<string, TranslationResources> = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
};

// تحديد اللغة الافتراضية بناءً على إعدادات الجهاز
const deviceLanguage = Localization.locale.split('-')[0] as 'en' | 'ar' | 'fr'; // تحديد النوع
const isRTL = deviceLanguage === 'ar'; // تحقق مما إذا كانت اللغة عربية

// ضبط اتجاه النص
I18nManager.forceRTL(isRTL);
I18nManager.allowRTL(isRTL);

// تهيئة i18next
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, // اللغة الافتراضية بناءً على الجهاز
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;