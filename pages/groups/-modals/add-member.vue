<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="model"
          :loading="$apollo.queries.users.loading"
          :items="users"
          :search-input.sync="search"
          :label="$t('group.findAUser')"
          auto-select-first
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          item-text="full_name"
          item-value="id"
          multiple
        >
          <template v-slot:selection="{attr, item, select, selected}">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              {{ item.full_name }}
            </v-chip>
          </template>

          <template v-slot:item="{item}">
            <template>
              <v-list-item-content>
                <v-list-item-title>{{ item.full_name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import USERS from '~/graphql/users.gql'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  data: () => ({
    search: '',
    users: []
  }),

  mounted () {
    this.model = []
  },

  apollo: {
    users: {
      query: USERS,
      variables () {
        return {
          first: 10,
          orderBy: [{ field: 'first_name', order: 'ASC' }],
          search: this.search || undefined,
          page: 1
        }
      },
      update: data => data.users.data
    }
  },

  methods: {
    remove (user: { id: Number }) {
      const index = this.model.indexOf(user.id)
      if (index >= 0) {
        this.model.splice(index, 1)
      }
    }
  }
})
</script>
