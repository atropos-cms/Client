<template>
  <v-app>
    <!-- Header and Sidebar -->
    <default-layout />

    <!-- Content -->
    <v-content>
      <v-container
        class="pa-xl-12 pa-lg-10 pa-sm-4 pa-2"
      >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import defaultLayout from './default/index.vue'

export default Vue.extend({
  components: {
    defaultLayout
  }
})
</script>
