import { persistentAtom } from '@nanostores/persistent'
import { createI18n, localeFrom, browser, formatter } from '@nanostores/i18n'
import { fetcher } from '@/utils/fetcher';

// export const locale = atom('ru');
export const locale = persistentAtom('locale', 'ru')


export const currentLocale = localeFrom(locale)
export const format = formatter(currentLocale)

export const i18n = createI18n(currentLocale, {
  baseLocale: 'ru',
  get (code) {
    return  fetcher(`/translations/${code}.json`)
  }
})
