<template>
  <v-card
    class="pa-2 flex-grow-1 d-flex align-stretch justify-md-center"
    hover
    outlined
    nuxt
    :to="application.url"
  >
    <div class="d-flex align-center flex-md-column">
      <!-- Application Icon -->
      <v-icon
        :size="64"
        color="primary"
      >
        {{ application.icon }}
      </v-icon>

      <!-- Application Name -->
      <div class="ma-3 d-flex align-md-center flex-column">
        <span class="headline">
          {{ $t(application.title) }}
        </span>
        <!-- Application Name -->
        <span class="caption text-md-center muted--text">
          {{ $t(application.description) }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Application } from '~/utils/maps/applicationMap'

export default Vue.extend({
  props: {
    application: {
      type: Object,
      required: true
    } as PropOptions<Application>
  }
})
</script>
