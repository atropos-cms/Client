<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="group" />
    </v-col>

    <v-col>
      <v-expansion-panels :value="2">
        <group-info
          :value="group"
          :loading="$apollo.queries.group.loading"
          @refreshGroup="refreshGroup"
        />

        <members
          :value="group"
          :loading="$apollo.queries.group.loading"
          class="mt-6"
          @refreshGroup="refreshGroup"
        />

        <permissions
          :value="group"
          :loading="$apollo.queries.group.loading"
          class="mt-6"
          @refreshGroup="refreshGroup"
        />
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Info from './-id/info.vue'
import GroupInfo from './-id/group-info.vue'
import Members from './-id/members.vue'
import Permissions from './-id/permissions.vue'
import GROUP from '~/graphql/queries/group.graphql'
import { Group } from '~/typescript/graphql'

export default Vue.extend({
  components: {
    Info,
    GroupInfo,
    Members,
    Permissions
  },

  data: () => ({
    img: false,
    group: {} as Group
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
  },

  methods: {
    refreshGroup () {
      this.$apollo.queries.group.refresh()
    }
  }
})
</script>
