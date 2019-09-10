<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        {{ me.first_name }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  data: () => ({
    me: {}
  }),

  apollo: {
    me: gql`query {
      me {
        first_name
      }
    }`
  }
})
</script>
