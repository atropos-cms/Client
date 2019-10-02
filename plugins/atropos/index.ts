import { Plugin } from '@nuxt/types'
import dialogPlugin from './dialog'
import validationPlugin from './validation'
import errorHandlingPlugin from './error-handling'

const atroposPlugin: Plugin = (context, inject) => {
  dialogPlugin(context, inject)
  errorHandlingPlugin(context, inject)
  validationPlugin(context, inject)
}

export default atroposPlugin
