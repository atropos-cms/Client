<template>
  <v-card>
    <v-card-title>
      <span class="mr-4">
        {{ $t('applications.users.title') }}
      </span>

      <v-btn text small color="primary" @click="addUser">
        {{ $t('applications.users.addNewUser') }}
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
      v-model="selected"
      :headers="headers"
      :items="users.data"
      :options.sync="options"
      :server-items-length="users.paginatorInfo.total"
      :loading="$apollo.queries.users.loading"
      item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editUser(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteUser(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUser from './-modals/create-user.vue'
import USERS from '~/graphql/Users.gql'
import CREATE_USER from '~/graphql/CreateUser.gql'
import DELETE_USER from '~/graphql/DeleteUser.gql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  data: () => ({
    showDeleteModal: false,
    showCreateModal: false,
    headers: [
      { text: 'First Name', value: 'first_name' },
      { text: 'Last Name', value: 'last_name' },
      { text: 'Email', value: 'email' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false }
    ],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['first_name'],
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
      query: USERS,
      variables () {
        const first = this.options.itemsPerPage === -1 ? this.users.paginatorInfo.total : this.options.itemsPerPage
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
    async addUser () {
      await this.$dialog({
        title: this.$t('account.messages.createUserTitle'),
        component: CreateUser,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: CREATE_USER,
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
        title: this.$t('account.messages.deleteUserTitle'),
        message: this.$t('account.messages.deleteUserMessage', user),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: DELETE_USER,
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
