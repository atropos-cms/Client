<template>
  <div>
    <toolheader>
      <v-btn
        absolute
        dark
        fab
        color="pink"
        @click="addRole"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <div class="flex-grow-1" />

      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('general.search')"
        single-line
        hide-details
      />
    </toolheader>

    <v-data-table
      :headers="headers"
      :items="roles.data"
      :footer-props="{ itemsPerPageOptions: [1, 50, 100] }"
      :options.sync="options"
      :server-items-length="roles.paginatorInfo.total"
      :loading="$apollo.queries.roles.loading"
      item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          class="mr-2"
          @click="editRole(item)"
        >
          edit
        </v-icon>
        <v-icon
          @click="deleteRole(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createRole from './-modals/create-role.vue'
import { i18n } from '~/plugins/vue-i18n'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  data: () => ({
    headers: [
      { text: i18n.t('role.name'), value: 'name' },
      { text: i18n.t('role.membersCount'), value: 'membersCount', sortable: false },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['name'],
      sortDesc: [false]
    },
    search: '',
    roles: {
      paginatorInfo: {
        total: 0
      },
      data: []
    }
  }),

  apollo: {
    roles: {
      query: require('~/graphql/queries/roles.graphql'),
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
      },
      debounce: 200
    }
  },

  methods: {
    async addRole () {
      await this.$dialog({
        title: this.$t('messages.createRoleTitle'),
        component: createRole,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/createRole.graphql'),
          variables: {
            data: model
          }
        }).then(() => {
          this.$apollo.queries.roles.refetch()
        })
      })
    },
    editRole (role: {id: Number}) {
      this.$router.push(`/roles/${role.id}`)
    },
    async deleteRole (role: {id: Number}) {
      await this.$confirm({
        title: this.$t('messages.deleteRoleTitle'),
        message: this.$t('messages.deleteRoleMessage', role),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/deleteRole.graphql'),
          variables: {
            id: role.id
          }
        }).then(() => {
          this.$apollo.queries.roles.refetch()
        })
      })
    }
  }
})
</script>
