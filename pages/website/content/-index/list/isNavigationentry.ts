import Vue from 'vue'
import { Navigationentry } from '~/typescript/graphql.ts'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  props: {
    navigationentry: {
      type: Object as () => Navigationentry,
      required: true,
      default: null
    }
  },

  methods: {
    editNavigationentry (navigationentry: { id: Number }) {
      this.$router.push(`/website/content/${navigationentry.id}`)
    },
    deleteNavigationentry (navigationentry: { id: Number }) {
      this.$confirm({
        title: this.$t('messages.deleteNavigationentryTitle'),
        message: this.$t('messages.deleteNavigationentryMessage', navigationentry),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/deleteNavigationentry.graphql'),
          variables: {
            id: navigationentry.id
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    }
  }
})
