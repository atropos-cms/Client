import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    model: {
      get () : any {
        return this.value
      },
      set (value: any) {
        this.$emit('input', value)
      }
    }
  }
})
