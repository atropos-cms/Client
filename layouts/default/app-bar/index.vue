<template>
  <v-app-bar
    clipped-left
    fixed
    flat
    app
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />

    <!-- <v-btn
      icon
      @click.stop="toggleMiniDrawer"
    >
      <v-icon>mdi-{{ `chevron-${miniDrawer ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->

    <v-toolbar-title >
      <span class="headline blue--text text--darken-2">
        {{ $t('atropos.title') }}
      </span>
      <span class="blue-grey--text">
        Account
      </span>
    </v-toolbar-title>

    <v-spacer />

    <account />

    <!-- <v-btn
      icon
      @click.stop="rightDrawer = !rightDrawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from './account.vue'

export default Vue.extend({
  components: {
    Account
  },

  data () {
    return {
      title: 'Vuetify.js'
    }
  },

  computed: {
    miniDrawer () : boolean {
      return this.$store.getters['ui/miniDrawer']
    }
  },

  methods: {
    toggleDrawer () {
      this.$store.commit('ui/toggleDrawer')
    },
    toggleMiniDrawer () {
      this.$store.commit('ui/toggleMiniDrawer')
    }
  }
})
</script>
