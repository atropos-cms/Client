import { Plugin } from '@nuxt/types'
import validationPlugin from './validation'


const atroposPlugin: Plugin = (context, inject) => {
  validationPlugin(context, inject)
}

export default atroposPlugin