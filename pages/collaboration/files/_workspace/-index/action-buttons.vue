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
      @click="editSelected"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn
      icon
      @click="deleteSelected"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import renameFileOrFolder from '../../-modals/rename-file-or-folder.vue'
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
        this.$emit('contentModified')
      })
    }
  }
})
</script>
