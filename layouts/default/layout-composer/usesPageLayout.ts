import Vue, { PropOptions } from 'vue'
import { PageLayout } from '~/utils/maps/pageLayoutMap'

export default Vue.extend({
  props: {
    pageLayout: {
      type: Object,
      required: true
    } as PropOptions<PageLayout>
  },

  computed: {
    hasNavigationDrawer () {
      return !!this.pageLayout.navigationDrawerComponent
    }
  }
})
