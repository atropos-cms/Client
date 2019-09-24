<template>
  <v-app-bar
    clipped-left
    fixed
    flat
    app
  >
    <v-app-bar-nav-icon
      v-if="pageLayout.showNavigationDrawer"
      @click.stop="toggleDrawer"
    />

    <!-- <v-btn
      icon
      @click.stop="toggleMiniDrawer"
    >
      <v-icon>mdi-{{ `chevron-${miniDrawer ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->

    <v-toolbar-title>
      <nuxt-link
        class="headline blue--text text--darken-2"
        to="/"
      >
        {{ $t('atropos.title') }}
      </nuxt-link>
      <span class="blue-grey--text">
        {{ $t(pageLayout.title) }}
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
import mixins from 'vue-typed-mixins'
import usesPageLayout from '../layout-composer/usesPageLayout'
import Account from './account.vue'

export default mixins(usesPageLayout).extend({
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
