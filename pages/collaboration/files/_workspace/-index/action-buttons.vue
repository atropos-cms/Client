<template>
  <div>
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
import UPDATE_FOLDER from '~/graphql/mutations/updateFolder.graphql'
import { Workspace, Folder } from '~/typescript/graphql.ts'
import DELETE_FOLDER from '~/graphql/mutations/deleteFolder.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  props: {
    workspace: {
      type: Object as () => Workspace,
      required: true,
      default: null
    },
    selected: {
      type: Array,
      required: true,
      default: null
    },
    parentId: {
      type: Number,
      required: true,
      default: null
    }
  },

  methods: {
    async editSelected () {
      const selectedItem = this.selected[0] as Folder

      await this.$dialog({
        title: this.$t('general.rename'),
        component: renameFileOrFolder,
        preset: Preset.Save,
        model: selectedItem,
        action: model => this.$apollo.mutate({
          mutation: UPDATE_FOLDER,
          variables: {
            id: selectedItem.id,
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
      const selectedItem = this.selected[0] as Folder

      this.$apollo.mutate({
        mutation: DELETE_FOLDER,
        variables: {
          id: selectedItem.id
        }
      }).then(() => {
        this.$emit('contentModified')
      })
    }
  }
})
</script>
