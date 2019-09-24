import Vue, { PropOptions } from 'vue'
import { PageLayout } from './pageLayoutMap'

export default Vue.extend({
  props: {
    pageLayout: {
      type: Object,
      required: true
    } as PropOptions<PageLayout>
  }
})