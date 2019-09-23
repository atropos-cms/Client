import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const loadedLanguages = ['en']

function setI18nLanguage (lang: string) {
  i18n.locale = lang
  return lang
}

export async function loadLanguageAsync (lang: string) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`)
      i18n.setLocaleMessage(lang, msgs.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

const vuei18nPlugin: Plugin = ({ app }) => {
  app.i18n = i18n
}

export default vuei18nPlugin
