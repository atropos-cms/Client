import Vue from 'vue'

interface Button {
  text: string,
  color: string
}
interface Options {
  width: Number
}

export interface Dialog {
  title: string,
  message?: string,
  confirmButton?: Button,
  cancelButton?: Button,
  options?: Options
}

interface PromiseDialog extends Dialog {
  resolve: Function,
  reject: Function
}

export default Vue.extend({
  data () {
    return {
      defaultOptions: {
        width: 320,
      } as Options,
  
      defaultConfirmButton: {
        text: this.$t('general.ok'),
        color: 'primary darken-1'
      } as Button,
  
      defaultCancelButton: {
        text: this.$t('general.cancel'),
        color: 'grey'
      } as Button
    }
  },
  computed: {
    dialog: {
      get (): PromiseDialog | null {
        return this.$store.getters['ui/dialog']
      },
      set (value: PromiseDialog): void {
        this.$store.commit('ui/setDialog', value)
      }
    },
    show: {
      get (): boolean {
        return this.dialog !== null
      },
      set (value: boolean): void {
        if (value) { return }
        this.$store.commit('ui/setDialog', null)
      }
    },

    resolve () : Function {
      if (!this.dialog) {
        return () => {}
      }
      return this.dialog.resolve
    },
    reject () : Function {
      if (!this.dialog) {
        return () => {}
      }
      return this.dialog.reject
    },

    title () : string | null {
      return this.dialog && this.dialog.title
    },
    message () : string | null | undefined {
      return this.dialog && this.dialog.message
    },


    options () : Options {
      let dialogOptions = this.dialog && this.dialog.options

      return {...this.defaultOptions, ...dialogOptions}
    },
    confirmButton () : Button {
      let dialogConfirmButton = this.dialog && this.dialog.confirmButton

      return {...this.defaultConfirmButton, ...dialogConfirmButton}
    },
    cancelButton () : Button {
      let dialogCancelButton = this.dialog && this.dialog.cancelButton

      return {...this.defaultCancelButton, ...dialogCancelButton}
    }
  }
})
