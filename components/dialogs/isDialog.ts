import Vue from 'vue'
import VueI18N from 'vue-i18n'

export enum Presets {
  Confirm = 'confirm',
  Delete = 'delete'
}

export interface Dialog {
  title: string | VueI18N.TranslateResult,
  message?: string | VueI18N.TranslateResult,
  preset?: Presets,
  action?: () => Promise<void | undefined>,
  confirmButton?: Button,
  cancelButton?: Button,
  options?: Options
}

interface PromiseDialog extends Dialog {
  resolve: Function,
  reject: Function
}

interface Button {
  text: string,
  color: string
}
interface Options {
  width: Number
}

type ButtonPreset = {
  [key in Presets]: {
    confirm: Button,
    cancel: Button
  }
}

const buttonPresets : ButtonPreset = {
  [Presets.Confirm]: {
    confirm: {
      text: 'general.ok',
      color: 'primary darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'grey'
    }
  },

  [Presets.Delete]: {
    confirm: {
      text: 'general.delete',
      color: 'red darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'primary'
    }
  }
}

export default Vue.extend({
  data () {
    return {
      defaultOptions: {
        width: 320
      } as Options
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

    title () : string | VueI18N.TranslateResult | null {
      return this.dialog && this.dialog.title
    },
    message () : string | VueI18N.TranslateResult | null | undefined {
      return this.dialog && this.dialog.message
    },
    preset () : Presets {
      return (this.dialog && this.dialog.preset) || Presets.Confirm
    },

    options () : Options {
      const dialogOptions = this.dialog && this.dialog.options

      return { ...this.defaultOptions, ...dialogOptions }
    },
    confirmButton () : Button {
      const dialogConfirmButton = this.dialog && this.dialog.confirmButton

      return { ...this.getPresets().confirm, ...dialogConfirmButton }
    },
    cancelButton () : Button {
      const dialogCancelButton = this.dialog && this.dialog.cancelButton

      return { ...this.getPresets().cancel, ...dialogCancelButton }
    }
  },

  methods: {
    getPresets () {
      return buttonPresets[this.preset]
    }
  }
})
