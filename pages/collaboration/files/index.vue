<template>
  <div class="mt-6">
    <template v-if="hasWorkspaces || $apollo.queries.workspaces.loading">
      <v-subheader>{{ $t('collaboration.files.workspaces') }}</v-subheader>

      <v-row dense>
        <!-- Loader -->
        <template
          v-if="$apollo.queries.workspaces.loading && !hasWorkspaces"
        >
          <v-col
            v-for="i in [1, 2]"
            :key="i"
            cols="12"
            md="4"
            lg="3"
            xl="2"
            class="d-flex align-stretch"
          >
            <v-card outlined class="d-flex flex-grow-1 flex-column">
              <v-skeleton-loader
                class="mb-6"
                type="card, list-item-three-line, actions"
              />
            </v-card>
          </v-col>
        </template>

        <!-- Workspace -->
        <workspace
          v-for="workspace in workspaces"
          :key="workspace.id"
          :workspace="workspace"
          @contentModified="contentModified"
        />
      </v-row>

      <v-divider class="my-4" />
    </template>

    <!-- Add new workspace -->
    <v-row dense>
      <v-col cols="12" md="4" lg="3" xl="2" class="d-flex align-stretch">
        <v-card outlined>
          <v-img
            class="white--text align-end ma-2"
            height="200px"
            contain
            :src="require('~/static/svgs/undraw_folder_39kl.svg')"
          />

          <v-card-title class="headline">
            {{ $t('messages.createWorkspaceTitle') }}
          </v-card-title>

          <v-card-subtitle>{{ $t('messages.createWorkspaceMessage') }}</v-card-subtitle>

          <v-card-actions class="justify-space-between">
            <v-btn
              outlined
              small
              color="primary"
              @click="createWorkspace"
            >
              {{ $t('collaboration.files.createWorkspace') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import workspace from './-index/workspace.vue'
import createWorkspace from './-modals/create-workspace.vue'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  components: {
    workspace
  },

  apollo: {
    workspaces: {
      query: require('~/graphql/queries/workspaces.graphql'),
      variables () {
        return {
          orderBy: [{
            field: 'name',
            order: 'ASC'
          }]
        }
      }
    }
  },

  computed: {
    hasWorkspaces () {
      return this.workspaces && this.workspaces.length
    }
  },

  methods: {
    async createWorkspace () {
      const title = this.$t('collaboration.files.createWorkspace')

      await this.$dialog({
        title,
        component: createWorkspace,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/createWorkspace.graphql'),
          variables: {
            data: model
          }
        }).then(() => {
          this.$apollo.queries.workspaces.refetch()
        })
      })
    },

    contentModified () {
      this.$apollo.queries.workspaces.refetch()
    }
  }
})
</script>
