import Vue from 'vue'
import _ from 'lodash'

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
      model: _.cloneDeep(this.value)
    }
  },

  methods: {
    updateModel () {
      this.model = _.cloneDeep(this.value)
    }
  },

  watch: {
    loading (value, oldValue) {
      if (oldValue && !value) {
        this.updateModel()
      }
    }
  }
})
