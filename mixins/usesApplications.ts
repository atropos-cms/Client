import Vue from 'vue'
import categoriesMap, { applicationsMap } from '~/utils/maps/applicationMap'

export default Vue.extend({
  data: () => ({
    applications: applicationsMap,
    categories: categoriesMap
  })
})
