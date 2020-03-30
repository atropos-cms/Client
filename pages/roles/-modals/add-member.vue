<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="model.selected"
          :loading="$apollo.queries.users.loading"
          :items="users"
          :search-input.sync="search"
          :label="$t('role.findAUser')"
          auto-select-first
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          item-text="fullName"
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
              {{ item.fullName }}
            </v-chip>
          </template>

          <template v-slot:item="{item}">
            <template>
              <v-list-item-content>
                <v-list-item-title>{{ item.fullName }}</v-list-item-title>
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
import USERS from '~/graphql/queries/users.graphql'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  data: () => ({
    search: '',
    users: []
  }),

  mounted () {
    this.model = {
      selected: [] as Number[]
    }
  },

  apollo: {
    users: {
      query: USERS,
      variables () {
        return {
          first: 100,
          orderBy: [{ field: 'firstName', order: 'ASC' }],
          search: this.search || undefined,
          page: 1
        }
      },
      update: data => data.users.data
    }
  },

  methods: {
    remove (user: { id: Number }) {
      const index = this.model.selected.indexOf(user.id)
      if (index >= 0) {
        this.model.selected.splice(index, 1)
      }
    }
  }
})
</script>
