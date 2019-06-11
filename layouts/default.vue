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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutHeader from './default/layout-header.vue'
import LayoutSidebar from './default/layout-sidebar.vue'

@Component({
  components: {
    LayoutHeader,
    LayoutSidebar
  }
})
export default class LayoutDefault extends Vue {}
</script>
