<template>
  <v-card>
    <v-card-title>
      <v-btn text small color="primary" @click="addGroup">
        {{ $t('applications.groups.addNewGroup') }}
      </v-btn>

      <div class="flex-grow-1" />

      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('general.search')"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="groups.data"
      :footer-props="{ itemsPerPageOptions: [10, 50, 100] }"
      :options.sync="options"
      :server-items-length="groups.paginatorInfo.total"
      :loading="$apollo.queries.groups.loading"
      item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editGroup(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteGroup(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import createGroup from './-modals/create-group.vue'
import { i18n } from '~/plugins/vue-i18n'
import GROUPS from '~/graphql/queries/groups.graphql'
import CREATE_GROUP from '~/graphql/mutations/createGroup.graphql'
import DELETE_GROUP from '~/graphql/mutations/deleteGroup.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  data: () => ({
    headers: [
      { text: i18n.t('group.name'), value: 'name' },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['name'],
      sortDesc: [false]
    },
    search: '',
    groups: {
      paginatorInfo: {
        total: 0
      },
      data: []
    }
  }),

  apollo: {
    groups: {
      query: GROUPS,
      variables () {
        const first = this.options.itemsPerPage
        const orderBy = this.options.sortBy.map((item, index) => ({
          field: item,
          order: this.options.sortDesc[index] ? 'DESC' : 'ASC'
        }))

        return {
          first,
          orderBy,
          search: this.search || undefined,
          page: this.options.page
        }
      }
    }
  },

  methods: {
    async addGroup () {
      await this.$dialog({
        title: this.$t('messages.createGroupTitle'),
        component: createGroup,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: CREATE_GROUP,
          variables: {
            data: model
          }
        }).then(() => {
          this.$apollo.queries.groups.refetch()
        })
      })
    },
    editGroup (group: {id: Number}) {
      this.$router.push(`/groups/${group.id}`)
    },
    async deleteGroup (group: {id: Number}) {
      await this.$confirm({
        title: this.$t('messages.deleteGroupTitle'),
        message: this.$t('messages.deleteGroupMessage', group),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: DELETE_GROUP,
          variables: {
            id: group.id
          }
        }).then(() => {
          this.$apollo.queries.groups.refetch()
        })
      })
    }
  }
})
</script>
