<template>
  <v-app>
    <!-- Header and Sidebar -->
    <default-layout />

    <!-- Content -->
    <v-main>
      <v-container class="px-xl-10 px-lg-8 px-sm-4 px-2 py-0">
        <nuxt />
      </v-container>
    </v-main>

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
