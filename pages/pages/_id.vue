<template>
  <v-card :loading="$apollo.queries.page.loading">
    <v-form ref="form" class="pa-4">
      <general
        :value="page"
        :loading="$apollo.queries.page.loading"
      />

      <content-editor
        :value="page"
      />
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import contentEditor from './-id/content.vue'
import general from './-id/general.vue'
import PAGE from '~/graphql/page.gql'

export default Vue.extend({
  components: {
    contentEditor,
    general
  },

  data: () => ({
    page: {}
  }),

  apollo: {
    page: {
      query: PAGE,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
})
</script>
