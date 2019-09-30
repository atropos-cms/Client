<template>
  <v-navigation-drawer
    v-if="hasNavigationDrawer"
    v-model="drawer"
    :mini-variant="miniDrawer"
    clipped
    floating
    fixed
    app
  >
    <component :is="pageLayout.navigationDrawerComponent" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import usesPageLayout from '../layout-composer/usesPageLayout'

export default mixins(usesPageLayout).extend({
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
