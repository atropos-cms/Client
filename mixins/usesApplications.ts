import Vue from 'vue'
import applicationsMap from '~/utils/maps/applicationMap'

export default Vue.extend({
  data: () => ({
    applications: applicationsMap
  })
})
