<template>
  <page
    :navigationentry="navigationentry"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import page from './page.vue'
import isNavigationentry from './isNavigationentry'

export default mixins(isNavigationentry).extend({
  components: {
    page
  }
})
</script>
