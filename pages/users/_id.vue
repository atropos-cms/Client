<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="user" />
    </v-col>

    <v-col>
      <personal-info
        :value="user"
        :loading="$apollo.queries.user.loading"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import info from './-id/info.vue'
import personalInfo from './-id/personal-info.vue'
import USER from '~/graphql/user.gql'

export default Vue.extend({
  components: {
    info,
    personalInfo
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
