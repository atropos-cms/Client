<template>
  <v-app>
    <!-- Header -->
    <app-bar />

    <!-- Sidebar -->
    <navigation-drawer />

    <!-- Content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from './default/app-bar/index.vue'
import NavigationDrawer from './default/navigation-drawer/index.vue'

export default Vue.extend({
  components: {
    AppBar,
    NavigationDrawer
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
})
</script>
