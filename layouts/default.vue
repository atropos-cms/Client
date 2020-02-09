<template>
  <v-app>
    <!-- Header and Sidebar -->
    <default-layout />

    <!-- Content -->
    <v-content>
      <v-container class="pa-xl-10 pa-lg-8 pa-sm-4 pa-2">
        <nuxt />
      </v-container>
    </v-content>

    <!-- Doalogs -->
    <dialogs />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import defaultLayout from './default/index.vue'
import Dialogs from '~/components/dialogs/index.vue'

export default Vue.extend({
  name: 'DefaultLayout',

  components: {
    defaultLayout,
    Dialogs
  }
})
</script>
