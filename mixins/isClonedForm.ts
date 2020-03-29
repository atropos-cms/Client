import Vue from 'vue'
import { cloneDeep } from 'lodash'

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

  data () {
    return {
      model: cloneDeep(this.value)
    }
  },

  watch: {
    loading (value, oldValue) {
      if (oldValue && !value) {
        this.updateModel()
      }
    }
  },

  methods: {
    updateModel () {
      this.model = cloneDeep(this.value)
    }
  }
})
