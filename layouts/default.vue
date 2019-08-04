<template>
  <v-app>
    <!-- Header -->
    <app-bar />

    <!-- Sidebar -->
    <navigation-drawer />


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
import AppBar from './default/app-bar/index.vue'
import NavigationDrawer from './default/navigation-drawer/index.vue'

@Component({
  components: {
    AppBar,
    NavigationDrawer
  }
})
export default class LayoutDefault extends Vue {}
</script>
