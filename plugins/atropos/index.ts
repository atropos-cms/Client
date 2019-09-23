import { Plugin } from '@nuxt/types'
import validationPlugin from './validation'
import errorHandlingPlugin from './error-handling'


const atroposPlugin: Plugin = (context, inject) => {
  errorHandlingPlugin(context, inject)
  validationPlugin(context, inject)
}

export default atroposPlugin