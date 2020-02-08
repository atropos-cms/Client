<template>
  <div>
    <v-subheader>{{ $t(category.title) }}</v-subheader>

    <v-row>
      <v-col
        v-for="application in category.applications"
        :key="application.name"
        class="d-flex align-stretch"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <app :application="application" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import App from './application.vue'
import { Category } from '~/utils/maps/applicationMap'

export default Vue.extend({
  components: {
    App
  },

  props: {
    category: {
      type: Object,
      required: true
    } as PropOptions<Category>
  }
})
</script>
