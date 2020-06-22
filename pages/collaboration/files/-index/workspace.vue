<template>
  <v-col cols="12" md="4" lg="3" xl="2" class="d-flex align-stretch">
    <v-card outlined class="d-flex flex-grow-1 flex-column">
      <v-card-title
        v-ripple
        class="headline cursor-pointer"
        @click="openWorkspace"
      >
        {{ workspace.name }}
      </v-card-title>

      <v-divider />

      <template v-if="true">
        <v-img
          class="white--text align-end ma-4 cursor-pointer"
          height="200px"
          contain
          :src="require('~/static/svgs/undraw_empty_xct9.svg')"
          @click="openWorkspace"
        />
        <v-card-subtitle class="subtitle-1 text-center">
          {{ $t('collaboration.files.workspaceEmpty') }}
        </v-card-subtitle>
      </template>
      <template v-else>
        <!-- New files -->
        <v-list dense class="flex-grow-1">
          <v-subheader>Newest Files</v-subheader>
          <v-list-item two-line @click="() => {}">
            <v-list-item-avatar :size="26">
              <v-icon>mdi-file-pdf</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
              <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-avatar :size="26">
              <v-icon>mdi-file-pdf</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
              <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-avatar :size="26">
              <v-icon>mdi-file-pdf</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
              <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-avatar :size="26">
              <v-icon>mdi-file-pdf</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
              <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider />

      <v-card-actions class="justify-space-between">
        <v-btn
          text
          small
          color="primary"
          @click="openWorkspace"
        >
          {{ $t('collaboration.files.viewWorkspace') }}
        </v-btn>

        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="manageMembers">
              <v-list-item-icon><v-icon>mdi-account-multiple-outline</v-icon></v-list-item-icon>
              <v-list-item-title>{{ $t('collaboration.files.manageWorkspaceMembers') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="renameWorkspace">
              <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
              <v-list-item-title>{{ $t('general.rename') }}</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item @click="() => {}">
              <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
              <v-list-item-title>{{ $t('collaboration.files.viewBin') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteWorkspace">
              <v-list-item-icon><v-icon>mdi-minus-circle-outline</v-icon></v-list-item-icon>
              <v-list-item-title>{{ $t('collaboration.files.deleteWorkspace') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import manageMembers from '../-modals/manage-members.vue'
import renameWorkspace from '../-modals/rename-workspace.vue'
import { Workspace } from '~/typescript/graphql.ts'
import UPDATE_WORKSPACE from '~/graphql/mutations/updateWorkspace.graphql'
import DELETE_WORKSPACE from '~/graphql/mutations/deleteWorkspace.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  props: {
    workspace: {
      type: Object as () => Workspace,
      required: true,
      default: null
    }
  },

  methods: {
    openWorkspace () {
      this.$router.push(`/collaboration/files/${this.workspace.id}`)
    },
    async manageMembers () {
      const title = this.$t('collaboration.files.manageWorkspaceMembers')

      await this.$dialog({
        title,
        component: manageMembers,
        preset: Preset.Save,
        model: {
          name: this.workspace.name
        },
        action: model => this.$apollo.mutate({
          mutation: UPDATE_WORKSPACE,
          variables: {
            id: this.workspace.id,
            data: model
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    },
    async renameWorkspace () {
      const title = this.$t('collaboration.files.renameWorkspace')

      await this.$dialog({
        title,
        component: renameWorkspace,
        preset: Preset.Save,
        model: {
          name: this.workspace.name
        },
        action: model => this.$apollo.mutate({
          mutation: UPDATE_WORKSPACE,
          variables: {
            id: this.workspace.id,
            data: model
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    },
    async deleteWorkspace () {
      await this.$confirm({
        title: this.$t('messages.deleteWorkspaceTitle'),
        message: this.$t('messages.deleteWorkspaceMessage', this.workspace),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: DELETE_WORKSPACE,
          variables: {
            id: this.workspace.id
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    }
  }
})
</script>
