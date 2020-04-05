import Vue from 'vue'
import { Navigationentry } from '~/typescript/types'
import DELETE_NAVIGATIONENTRY from '~/graphql/mutations/deleteNavigationentry.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  props: {
    navigationentry: {
      type: Navigationentry,
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
          mutation: DELETE_NAVIGATIONENTRY,
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
