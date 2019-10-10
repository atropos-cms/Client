<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      height="null"
      class="py-2"
    >
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="4" sm="6">
          <v-toolbar-title>{{ $t('applications.pages.title') }}</v-toolbar-title>
        </v-col>
        <v-col cols="8" sm="6" class="d-flex align-center">
          <v-text-field
            label="Search"
            single-line
            outlined
            hide-details
            dense
          />
          <v-btn text flat>
            <v-icon>add</v-icon>
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <div class="mt-6">
      <v-card
        v-for="page in pages"
        :key="page.id"
        class="mb-2"
      >
        <v-card-title class="title font-weight-light pa-2">{{ page.title }}</v-card-title>
      </v-card>
    </div>
  </v-card>
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
