<template>
  <v-container>
    <div
      v-for="category in categories"
      :key="category.name"
    >
      <category :category="category" />
    </div>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Category from './-index/category.vue'
import usesApplications from '~/mixins/usesApplications.ts'

export default mixins(usesApplications).extend({
  components: {
    Category
  }
})
</script>
