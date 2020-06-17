import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import toolheader from '~/components/toolheader.vue'

const install: Plugin = () => {
  Vue.component('toolheader', toolheader)
}

export default install
