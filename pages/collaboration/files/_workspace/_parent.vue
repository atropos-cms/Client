<template>
  <div>
    <toolheader>
      <add-button
        v-if="parameters"
        :workspace-id="parameters.workspace"
        :parent-id="parameters.parent"
        @contentModified="contentModified"
      />

      <v-spacer></v-spacer>

      <action-buttons
        v-if="workspace && hasSelection"
        :selected="selected"
        :workspace="workspace"
        :parent-id="parameters.parent"
        @contentModified="contentModified"
      />
    </toolheader>

    <!-- Folder empty -->
    <template v-if="!hasContent && !$apollo.loading">
      <v-img
        class="white--text align-end ma-8"
        height="300px"
        contain
        :src="require('~/static/svgs/undraw_no_data_qbuo.svg')"
      />
      <h4 class="text-h4 text-center">
        {{ $t('messages.folderEmptyTitle') }}
      </h4>
      <div class="text-subtitle-1 text-center">
        {{ $t('messages.folderEmptyMessage') }}
      </div>
    </template>

    <!-- Folder list -->
    <div v-else>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="filesAndFolders"
        :options.sync="options"
        :mobile-breakpoint="0"
        item-key="uuid"
        disable-pagination
        hide-default-footer
        @click:row="selectRow"
        @dblclick:row="openFileOrFolder"
      >
        <template v-slot:item.name="{ item }">
          <v-icon
            :color="mimeTypeColor(item)"
            class="mr-2"
          >{{ mimeTypeIcon(item) }}</v-icon>
          <span>{{ item.name }}</span>
          <span
            v-if="item.fileExtension"
            class="ml-n1 muted--text"
          >.{{ item.fileExtension }}</span>
        </template>

        <template v-slot:item.updatedAt="{ item }">
          <span class="muted--text">{{ formatDate(item.updatedAt) }}</span>
        </template>

        <template v-slot:item.size="{ item }">
          <span class="muted--text">{{ formatSize(item.size) }}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import filesize from 'filesize'
import addButton from './-index/add-button.vue'
import actionButtons from './-index/action-buttons.vue'
import mimeTypeIcons from './-index/mimeTypeIcons'
import dayjs from '~/utils/dayjs'

export default mixins(mimeTypeIcons).extend({
  components: {
    addButton,
    actionButtons
  },

  data: () => ({
    headers: [
      { text: 'Name', align: 'start', width: '40%', value: 'name' },
      { text: 'Last modified', value: 'updatedAt' },
      { text: 'File size', value: 'size' }
    ],
    options: {
      sortBy: [],
      sortDesc: []
    },
    selected: []
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
          this.$router.push('/collaboration/files')
        }
      }
    },
    folders: {
      query: require('~/graphql/queries/folders.graphql'),
      variables () {
        return {
          workspace_id: this.parameters.workspace,
          parent_id: this.parameters.parent,
          orderBy: [{
            field: 'name',
            order: 'ASC'
          }]
        }
      },
      result ({ error }: any) {
        if (error) {
          this.$router.push(`/collaboration/files/${this.parameters.workspace}`)
        }
      }
    },
    files: {
      query: require('~/graphql/queries/files.graphql'),
      variables () {
        return {
          workspace_id: this.parameters.workspace,
          parent_id: this.parameters.parent,
          orderBy: [{
            field: 'name',
            order: 'ASC'
          }]
        }
      }
    }
  },

  computed: {
    parameters () {
      return {
        workspace: parseInt(this.$route.params.workspace),
        parent: parseInt(this.$route.params.parent)
      }
    },
    hasContent () {
      return this.filesAndFolders.length > 0
    },
    hasSelection () {
      return this.selected.length > 0
    },
    filesAndFolders () {
      const folders = this.folders || []
      const files = this.files || []

      return [...folders, ...files]
    }
  },

  methods: {
    contentModified () {
      this.$apollo.queries.workspace.refetch()
      this.$apollo.queries.folders.refetch()
      this.$apollo.queries.files.refetch()
    },
    formatDate (value: string) {
      if (!value) { return null }
      return dayjs(value).format('LL')
    },
    formatSize (value: number) {
      if (!value) { return null }
      return filesize(value)
    },

    selectRow (_: any, { select }: any) {
      this.selected = []
      this.$nextTick(() => select(true))
    },
    openFileOrFolder (_: any, { item }: any) {
      if (item.__typename === 'Folder') {
        this.$router.push(`/collaboration/files/${this.workspace.id}/${item.id}`)
      }
    }
  }
})
</script>
