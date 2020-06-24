<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        absolute
        dark
        fab
        color="pink"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-list
      :width="300"
      dense
    >
      <!-- Folder -->
      <v-list-item
        @click="addFolder"
      >
        <v-list-item-icon>
          <v-icon>mdi-folder-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('collaboration.files.newFolder') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- Upload File -->
      <v-list-item
        @click="openFileSelectDialog"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('collaboration.files.uploadFile') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Upload Folder -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>mdi-folder-upload-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('collaboration.files.uploadFolder') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <form ref="fileForm" style="display: none">
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        multiple
        @change="handleObjectChange">
    </form>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import createFolder from '../../-modals/create-folder.vue'
import { uploadFileOrFolder } from './uploadFile'
import { Preset } from '~/components/dialogs/isDialog'

export default defineComponent({
  props: {
    workspaceId: {
      type: Number,
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
    async addFolder () {
      const title = this.$t('collaboration.files.newFolder')

      await this.$dialog({
        title,
        component: createFolder,
        preset: Preset.Create,
        model: {
          name: '',
          workspace: {
            connect: this.workspaceId
          },
          parent: {
            connect: this.parentId
          }
        },
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/createFolder.graphql'),
          variables: {
            data: model
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    },
    openFileSelectDialog () {
      if (!this.$refs.fileInput) {
        return
      }

      // open the fileSelectionDialog
      this.$refs.fileInput.click()
    },

    async handleObjectChange (event: any) {
      for (let i = 0; i < event.target.files.length; i++) {
        await uploadFileOrFolder(this.$apollo, {
          file: event.target.files.item(i),
          workspaceId: this.workspaceId,
          parentId: this.parentId
        })
      }
      this.$refs.fileForm.reset()

      this.$emit('contentModified')
    }
  }
})
</script>
