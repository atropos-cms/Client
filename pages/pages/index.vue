<template>
  <v-container>
    <span class="display-1">
      {{ $t('applications.pages.title') }}
    </span>

    <div class="mt-6">
      <v-card
        v-for="page in pages"
        :key="page.id"
        class="mb-2"
      >
        <v-card-title class="title font-weight-light pa-2">{{ page.title }}</v-card-title>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PAGES from '~/graphql/pages.gql'

export default Vue.extend({
  data: () => ({
    pages: []
  }),

  apollo: {
    pages: {
      query: PAGES
    }
  }
})
</script>
