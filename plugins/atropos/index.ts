import { Plugin } from '@nuxt/types'
import componentsPlugin from './components'
import dialogPlugin from './dialog'
import validationPlugin from './validation'
import errorHandlingPlugin from './error-handling'

const atroposPlugin: Plugin = (context, inject) => {
  componentsPlugin(context, inject)
  dialogPlugin(context, inject)
  errorHandlingPlugin(context, inject)
  validationPlugin(context, inject)
}

export default atroposPlugin
