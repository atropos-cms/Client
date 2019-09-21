import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: () => ({
    internalModel: null
  }),

  computed: {
    model: {
      get () : any {
        return this.internalModel || _.cloneDeep(this.value)
      },
      set (value: any) {
        this.internalModel = value
      }
    }
  },

  watch: {
    value: {
      handler () {
        if (this.internalModel) return
        this.internalModel = _.cloneDeep(this.value)
      },
      deep: true
    }
  }, 
})
