<template>
  <v-list>
    <v-list-item
      v-for="application in applications"
      :key="application.name"
      :to="application.url"
      :exact="application.exact"
      nuxt
    >
      <v-list-item-action>
        <v-icon>{{ application.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="$t(application.title)" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import usesApplications from '~/mixins/usesApplications.ts'

export default mixins(usesApplications).extend({
})
</script>
