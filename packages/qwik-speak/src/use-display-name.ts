import { noSerialize } from '@builder.io/qwik';
import { useSpeakLocale } from './use-speak';

export type DisplayNameFn = {
  /**
   * Return the translation of language, region, script or currency display names
   * @param code ISO code of language, region, script or currency
   * @param options Intl DisplayNamesOptions object
   * @param lang Optional language if different from the current one
   * @returns The translated code
   */
  (code: string, options: Intl.DisplayNamesOptions, lang?: string): string;
};

export const useDisplayName = () => {
  const locale = useSpeakLocale();

  const displayName = (code: string, options: Intl.DisplayNamesOptions, lang?: string) => {
    lang ??= locale.extension ?? locale.lang;

    return new Intl.DisplayNames(lang, options).of(code) || code;
  };

  return noSerialize(displayName) as DisplayNameFn;
};
