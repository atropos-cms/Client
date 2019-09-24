<template>
  <div>
    <!-- App-Bar -->
    <app-bar
      :page-layout="pageLayout"
    />

    <!-- Navigation Drawer -->
    <navigation-drawer
      :page-layout="pageLayout"
    />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import AppBar from './app-bar/index.vue'
import NavigationDrawer from './navigation-drawer/index.vue'
import layoutComposer from './layout-composer/index'

export default mixins(layoutComposer).extend({
  components: {
    AppBar,
    NavigationDrawer
  }
})
</script>
