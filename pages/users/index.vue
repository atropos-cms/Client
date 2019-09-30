<template>
  <v-card>
    <v-card-title>
      {{ $t('applications.users.title') }}
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users.data"
      :options.sync="options"
      :server-items-length="users.paginatorInfo.total"
      :loading="$apollo.queries.users.loading"
      item-key="id"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import USERS from '~/graphql/Users.gql'

export default Vue.extend({
  components: {
  },

  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'First Name', value: 'first_name' },
      { text: 'Last Name', value: 'last_name' },
      { text: 'Email', value: 'email' }
    ],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: []
    },
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
  }
})
</script>
