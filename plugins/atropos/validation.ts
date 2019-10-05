import { Plugin } from '@nuxt/types'
import { i18n } from '~/plugins/vue-i18n'
import Validation from '~/utils/validation/index'

declare module 'vue/types/vue' {
  interface Vue {
    $v(prop: string, attribute?: string, parameters?:object): string
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $v(prop: string, attribute?: string, parameters?:object): string
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $v(prop: string, attribute?: string, parameters?:object): string
  }
}

const v = (prop: string, attribute?:string, parameters?:object) => {
  const error = Validation.firstErrorMessage(prop)
  if (!error) { return null }

  attribute = attribute || prop
  return i18n.t(error, { attribute: i18n.t(attribute), ...parameters})
}

const install: Plugin = (_context, inject) => {
  inject('v', v)
}

export default install
