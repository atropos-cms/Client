import { Plugin } from '@nuxt/types'
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

const atroposPlugin: Plugin = (context, inject) => {
  inject('v', (prop : string) => {
    const error = Validation.errorMessage(prop)
    return error && error.validation[0]
  })
}

export default atroposPlugin