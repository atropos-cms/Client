import { Plugin } from '@nuxt/types'
import { i18n } from '~/plugins/vue-i18n'
import Validation from '~/utils/validation/index'

declare module 'vue/types/vue' {
  interface Vue {
    $v(prop: string): string
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $v(prop: string): string
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $v(prop: string): string
  }
}

const v = (prop: string, attribute:string|null = null) => {
  const error = Validation.firstErrorMessage(prop)
  if (!error) { return null }

  attribute = attribute || prop
  return i18n.t(error, { attribute: i18n.t(attribute) })
}

const install: Plugin = ({ app }, inject) => {
  inject('v', v)
}

export default install
