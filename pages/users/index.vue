<template>
  <v-card>
    <v-card-title>
      {{ $t('applications.users.title') }}
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

    <!-- Delete User modal -->
    <delete-modal :selected="selected" :show.sync="showDeleteModal" />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import DeleteModal from './-modals/deleteUser.vue'
import USERS from '~/graphql/Users.gql'

export default Vue.extend({
  components: {
    DeleteModal
  },

  data: () => ({
    showDeleteModal: false,
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
    selected: [],
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
    editUser (user: {id: Number}) {
      this.$router.push(`/users/${user.id}`)
    },
    deleteUser (user: {}) {
      this.selected = [user]
      this.showDeleteModal = true
    }
  }
})
</script>
