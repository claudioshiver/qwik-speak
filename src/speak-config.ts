import { $ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import {
  LoadTranslationFn,
  SpeakConfig,
  TranslationFn
} from 'qwik-speak';

/**
 * Speak config
 */
export const config: SpeakConfig = {
  defaultLocale: { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } },
  supportedLocales: [
    { lang: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome', units: { 'length': 'kilometer' } },
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } }
  ],
  assets: [
    'app', // Translations shared by the pages
    'runtime' // Translations with dynamic keys or parameters
  ]
};

/**
 * E.g. Fetch translation data from json files
 * In productions with inlined translations, only the runtime file is loaded
 */
export const loadTranslation$: LoadTranslationFn = $(async (lang: string, asset: string, origin?: string) => {
  if (import.meta.env.DEV || asset === 'runtime') {
    let url = '';
    // Absolute urls on server
    if (isServer && origin) {
      url = origin;
    }
    url += `/i18n/${lang}/${asset}.json`;
    const response = await fetch(url);
    return response.json();

    /* let data: any = null;
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (error) {
      // Implement error handling here
      console.log('loadTranslation$ error: ', error);
    }
    return data; */
  }
});

/**
 * Translation functions
 */
export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
};

/**
 * Unit testing
 */
export const loadTranslationStub$: LoadTranslationFn = $((lang: string, asset: string, origin?: string) =>
  JSON.parse(
    import.meta.glob('/public/i18n/**/*.json', { as: 'raw', eager: true })[
    `/public/i18n/${lang}/${asset}.json`
    ]
  )
);

export const translationFnStub: TranslationFn = {
  loadTranslation$: loadTranslationStub$
};