import { Plugin } from '@nuxt/types'
import { Store } from 'vuex'
import { Dialog, Width } from '~/components/dialogs/isDialog'

declare module 'vue/types/vue' {
  interface Vue {
    $confirm(options: Dialog): Promise<boolean>
    $dialog(options: Dialog): Promise<boolean>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $confirm(options: Dialog): Promise<boolean>
    $dialog(options: Dialog): Promise<boolean>
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $confirm(options: Dialog): Promise<boolean>
    $dialog(options: Dialog): Promise<boolean>
  }
}

const confirm = (store: Store<any>) => (options: Dialog) => {
  return new Promise((resolve, reject) => {
    store.commit('ui/setDialog', {
      ...options,
      ...{
        options: {
          width: Width.Small
        }
      },
      resolve,
      reject
    })
  })
}

const dialog = (store: Store<any>) => (options: Dialog) => {
  return new Promise((resolve, reject) => {
    store.commit('ui/setDialog', {
      ...options,
      resolve,
      reject
    })
  })
}

const install: Plugin = ({ store }, inject) => {
  inject('confirm', confirm(store))
  inject('dialog', dialog(store))
}

export default install
