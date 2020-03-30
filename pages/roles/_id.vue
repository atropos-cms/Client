<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="role" />
    </v-col>

    <v-col>
      <v-expansion-panels :value="2">
        <role-info
          :value="role"
          :loading="$apollo.queries.role.loading"
          @refreshRole="refreshRole"
        />

        <members
          :value="role"
          :loading="$apollo.queries.role.loading"
          class="mt-6"
          @refreshRole="refreshRole"
        />

        <permissions
          :value="role"
          :loading="$apollo.queries.role.loading"
          class="mt-6"
          @refreshRole="refreshRole"
        />
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Info from './-id/info.vue'
import RoleInfo from './-id/role-info.vue'
import Members from './-id/members.vue'
import Permissions from './-id/permissions.vue'
import ROLE from '~/graphql/queries/role.graphql'
import { Role } from '~/typescript/graphql'

export default Vue.extend({
  components: {
    Info,
    RoleInfo,
    Members,
    Permissions
  },

  data: () => ({
    img: false,
    role: {} as Role
  }),

  apollo: {
    role: {
      query: ROLE,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },

  methods: {
    refreshRole () {
      this.$apollo.queries.role.refresh()
    }
  }
})
</script>
