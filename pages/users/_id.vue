<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="user"/>
    </v-col>

    <v-col>
      <v-card
        class="pa-2"
        outlined
        tile
      >
        col
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Info from './-id/info.vue'
import USER from '~/graphql/User.gql'

export default Vue.extend({
  components: {
    Info
  },

  data: () => ({
    img: false,
    user: {}
  }),

  apollo: {
    user: {
      query: USER,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
})
</script>
