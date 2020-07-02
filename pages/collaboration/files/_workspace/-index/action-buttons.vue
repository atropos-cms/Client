<template>
  <div>
    <v-btn
      icon
      @click="downloadSelected"
    >
      <v-icon>mdi-download</v-icon>
    </v-btn>

    <v-btn
      icon
      @click="deleteSelected"
    >
      <v-icon>mdi-delete</v-icon>
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
        <v-list-item @click="downloadSelected">
          <v-list-item-icon><v-icon>mdi-download</v-icon></v-list-item-icon>
          <v-list-item-title>{{ $t('collaboration.files.actions.download') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="editSelected">
          <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
          <v-list-item-title>{{ $t('general.rename') }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item @click="deleteSelected">
          <v-list-item-icon><v-icon>mdi-delete</v-icon></v-list-item-icon>
          <v-list-item-title>{{ $t('collaboration.files.actions.delete') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import renameFileOrFolder from '../../-modals/rename-file-or-folder.vue'
import { downloadFileOrFolder } from './downloadFile'
import { Workspace, Folder, File } from '~/typescript/graphql.ts'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  props: {
    workspace: {
      type: Object as () => Workspace,
      required: true,
      default: null
    },
    selected: {
      type: Array as () => (Folder | File)[],
      required: true,
      default: null
    },
    parentId: {
      type: Number,
      required: true,
      default: null
    }
  },

  computed: {
    firstSelected () : Folder | File {
      return this.selected[0]
    }
  },

  methods: {
    downloadSelected () {
      downloadFileOrFolder(this.$apollo, { object: this.firstSelected })
    },
    async editSelected () {
      const mutation = (this.firstSelected.__typename === 'Folder')
        ? require('~/graphql/mutations/updateFolder.graphql')
        : require('~/graphql/mutations/updateFile.graphql')

      await this.$dialog({
        title: this.$t('general.rename'),
        component: renameFileOrFolder,
        preset: Preset.Save,
        model: this.firstSelected,
        action: model => this.$apollo.mutate({
          mutation,
          variables: {
            id: this.firstSelected.id,
            data: {
              name: model.name
            }
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    },
    deleteSelected () {
      const mutation = (this.firstSelected.__typename === 'Folder')
        ? require('~/graphql/mutations/deleteFolder.graphql')
        : require('~/graphql/mutations/deleteFile.graphql')

      this.$apollo.mutate({
        mutation,
        variables: {
          id: this.firstSelected.id
        }
      }).then(() => {
        this.$emit('unselectAll')
        this.$emit('contentModified')
      })
    }
  }
})
</script>
