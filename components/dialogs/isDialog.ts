import Vue, { VueConstructor } from 'vue'
import VueI18N from 'vue-i18n'

export enum Preset {
  Create = 'create',
  Delete = 'delete',
  Ok = 'ok',
  Remove = 'remove',
  Save = 'save'
}

export enum Width {
  Normal = 600,
  Small = 380,
}

export interface Dialog {
  title: string | VueI18N.TranslateResult,
  message?: string | VueI18N.TranslateResult,
  component?: VueConstructor<Vue>,
  preset?: Preset,
  action?: (model: any) => Promise<void | undefined> | any,
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
  width: Width,
  persistent: Boolean
}

type ButtonPreset = {
  [key in Preset]: {
    confirm: Button,
    cancel: Button
  }
}

const buttonPresets : ButtonPreset = {
  [Preset.Create]: {
    confirm: {
      text: 'general.create',
      color: 'primary darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'grey'
    }
  },

  [Preset.Delete]: {
    confirm: {
      text: 'general.delete',
      color: 'red darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'primary'
    }
  },

  [Preset.Ok]: {
    confirm: {
      text: 'general.ok',
      color: 'primary darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'grey darken-1'
    }
  },

  [Preset.Remove]: {
    confirm: {
      text: 'general.remove',
      color: 'red darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'primary'
    }
  },

  [Preset.Save]: {
    confirm: {
      text: 'general.save',
      color: 'primary darken-1'
    },
    cancel: {
      text: 'general.cancel',
      color: 'grey darken-1'
    }
  }
}

export default Vue.extend({
  data () {
    return {
      defaultOptions: {
        width: Width.Normal,
        persistent: true
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
    component () : VueConstructor<Vue> | null | undefined {
      return this.dialog && this.dialog.component
    },
    preset () : Preset {
      return (this.dialog && this.dialog.preset) || Preset.Ok
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
