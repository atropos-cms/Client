<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="group" />
    </v-col>

    <v-col>
      <group-info
        :value="group"
        :loading="$apollo.queries.group.loading"
      />

      <members
        :value="group"
        :loading="$apollo.queries.group.loading"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import info from './-id/info.vue'
import groupInfo from './-id/group-info.vue'
import members from './-id/members.vue'
import GROUP from '~/graphql/group.gql'

export default Vue.extend({
  components: {
    info,
    groupInfo,
    members
  },

  data: () => ({
    img: false,
    group: {}
  }),

  apollo: {
    group: {
      query: GROUP,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
})
</script>
