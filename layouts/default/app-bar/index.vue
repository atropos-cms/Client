<template>
  <v-app-bar
    color="primary"
    clipped-left
    fixed
    flat
    app
    dark
  >
    <v-app-bar-nav-icon
      v-if="hasNavigationDrawer"
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
        class="headline white--text"
        to="/"
      >
        {{ $t('atropos.title') }}
      </nuxt-link>
      <span class="">
        {{ $t(pageLayout.title) }}
      </span>
    </v-toolbar-title>

    <v-spacer />

    <applications />

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
import Applications from './applications.vue'

export default mixins(usesPageLayout).extend({
  components: {
    Account,
    Applications
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
