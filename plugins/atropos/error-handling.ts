import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import FlowControlException from '~/utils/exceptions/FlowControlException'

Vue.config.errorHandler = (err, vm, info) => {
  // If the exception is an flow control exception
  // we can just ignore it as it is only used to break 
  // the execution path
  if (err instanceof FlowControlException) {
    return true
  }

  return false
}

const install: Plugin = ({ app }, inject) => {}
export default install