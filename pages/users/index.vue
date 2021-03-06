<template>
  <div>
    <toolheader>
      <v-btn
        absolute
        dark
        fab
        color="pink"
        @click="addUser"
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
      v-model="selected"
      :headers="headers"
      :items="users.data"
      :footer-props="{ itemsPerPageOptions: [15, 50, 100] }"
      :options.sync="options"
      :server-items-length="users.paginatorInfo.total"
      :loading="$apollo.queries.users.loading"
      item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          class="mr-2"
          @click="editUser(item)"
        >
          edit
        </v-icon>
        <v-icon
          @click="deleteUser(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createUser from './-modals/create-user.vue'
import { i18n } from '~/plugins/vue-i18n'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  data: () => ({
    headers: [
      { text: i18n.t('user.firstName'), value: 'firstName' },
      { text: i18n.t('user.lastName'), value: 'lastName' },
      { text: i18n.t('user.email'), value: 'email' },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['firstName'],
      sortDesc: [false]
    },
    selected: [] as object[],
    search: '',
    users: {
      paginatorInfo: {
        total: 0
      },
      data: []
    }
  }),

  apollo: {
    users: {
      query: require('~/graphql/queries/users.graphql'),
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
    async addUser () {
      await this.$dialog({
        title: this.$t('messages.createUserTitle'),
        component: createUser,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/createUser.graphql'),
          variables: {
            data: model
          }
        }).then(() => {
          this.$apollo.queries.users.refetch()
        })
      })
    },
    editUser (user: {id: Number}) {
      this.$router.push(`/users/${user.id}`)
    },
    async deleteUser (user: {id: Number}) {
      await this.$confirm({
        title: this.$t('messages.deleteUserTitle'),
        message: this.$t('messages.deleteUserMessage', user),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/deleteUser.graphql'),
          variables: {
            id: user.id
          }
        }).then(() => {
          this.$apollo.queries.users.refetch()
        })
      })
    }
  }
})
</script>
