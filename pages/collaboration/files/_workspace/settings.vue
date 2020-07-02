<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <info :value="workspace" />
    </v-col>

    <v-col>
      <v-expansion-panels :value="0">
        <workspace-info
          :value="workspace"
          :loading="$apollo.queries.workspace.loading"
          @refreshWorkspace="refreshWorkspace"
        />

        <roles
          :value="workspace"
          :loading="$apollo.queries.workspace.loading"
          @refreshWorkspace="refreshWorkspace"
        />
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Info from './-settings/info.vue'
import WorkspaceInfo from './-settings/workspace-info.vue'
import Roles from './-settings/roles.vue'
import { Workspace } from '~/typescript/graphql'

export default Vue.extend({
  components: {
    Info,
    Roles,
    WorkspaceInfo
  },

  data: () => ({
    img: false,
    workspace: {} as Workspace
  }),

  apollo: {
    workspace: {
      query: require('~/graphql/queries/workspace.graphql'),
      variables () {
        return {
          id: this.$route.params.workspace
        }
      },
      result ({ data }) {
        if (data === undefined) {
          return
        }

        // If the workspace we requested does not exists,
        // we redirect back to the overview page
        if (data.workspace === null) {
          this.$router.push('/collaboration')
        }
      }
    }
  },
  methods: {
    refreshWorkspace () {
      this.$apollo.queries.workspace.refresh()
    }
  }
})
</script>
