<template>
  <v-navigation-drawer
    v-if="hasNavigationDrawer"
    v-model="drawer"
    :mini-variant="miniDrawer"
    :color="$vuetify.theme.dark ? 'black' : 'white'"
    clipped
    floating
    fixed
    app
  >
    <v-list-item two-line>
      <v-list-item-avatar
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'blue-grey lighten-5'"
      >
        <img
          v-if="img"
          :src="img"
          alt="avatar"
        >
        <span v-else>
          {{ me.initials }}
        </span>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ me.firstName }} {{ me.lastName }}</v-list-item-title>
        <v-list-item-subtitle>{{ me.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <component :is="pageLayout.navigationDrawerComponent" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import usesPageLayout from '../layout-composer/usesPageLayout'
import MeQueryGQL from '~/graphql/queries/me.graphql'

export default mixins(usesPageLayout).extend({
  data: () => ({
    openMenu: false,
    img: null,
    me: {}
  }),

  apollo: {
    me: { query: MeQueryGQL }
  },

  computed: {
    drawer: {
      get (): boolean {
        return this.$store.getters['ui/drawer']
      },
      set (value: boolean): void {
        this.$store.commit('ui/setDrawer', value)
      }
    },
    miniDrawer () : boolean {
      return this.$store.getters['ui/miniDrawer']
    }
  }
})
</script>
