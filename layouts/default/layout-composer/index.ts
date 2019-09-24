import Vue from 'vue'
import _ from 'lodash'
import pageLayoutMap, { PageLayout, defaultPageLayout } from './pageLayoutMap'

export default Vue.extend({
  computed: {
    pageLayout () : PageLayout {
      const routePath = _.trim(this.$route.fullPath, '/')
      const pageLayout = pageLayoutMap.find(p => {
        // If the regex property is an array of regexes,
        // check each of them for a match
        if (Array.isArray(p.regex)) {
          return !!p.regex.find(r => routePath.match(r))
        }

        // otherwise it should be a string/regex
        return routePath.match(p.regex)
      })

      return pageLayout || defaultPageLayout
    }
  }
})