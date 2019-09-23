import { Plugin } from '@nuxt/types'
import validationPlugin from './validation'


const atroposPlugin: Plugin = (context, inject) => {
  validationPlugin()
}

export default atroposPlugin