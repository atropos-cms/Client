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

      <div @click="update">
        Click
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
        id
        first_name
      }
    }`
  },

  methods: {
    update () {
      this.$apollo.mutate({
        mutation: gql`mutation {
          updateMe(data: {first_name: "Ralph"}) {
            id
            first_name
          }
        }`
      })
    }
  }
})
</script>
