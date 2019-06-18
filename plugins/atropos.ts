import Vue from 'vue'
import { validationErrors } from './atropos/validation-errors'

// Helpers
export default () => {
  Vue.prototype.$validationErrors = validationErrors
}

