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
        id
        first_name
      }
    }`,

    $subscribe: {
      // When a tag is added
      tagAdded: {
        query: gql`subscription tags($id: ID!) {
          userUpdated(id: $id) {
            id
            first_name
          }
        }`,
        // Reactive variables
        variables () {
          // This works just like regular queries
          // and will re-subscribe with the right variables
          // each time the values change
          return {
            id: this.me.id
          }
        },
        // Result hook
        // Don't forget to destructure `data`
        result ({ data }) {
          console.log(data.tagAdded)
        }
      }
    }
  }
})
</script>
