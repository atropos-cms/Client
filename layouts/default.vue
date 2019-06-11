<template>
  <v-app>
    <!-- Sidebar -->
    <layout-sidebar />

    <!-- Header -->
    <layout-header />

    <!-- Content -->
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import Vue from 'vue'
import LayoutHeader from './default/layout-header.vue'
import LayoutSidebar from './default/layout-sidebar.vue'

export default Vue.extend({
  components: {
    LayoutHeader,
    LayoutSidebar
  }
})
</script>
