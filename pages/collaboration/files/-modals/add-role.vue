<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="model.selected"
          :loading="$apollo.queries.roles.loading"
          :items="roles"
          :search-input.sync="search"
          :label="$t('collaboration.files.findRole')"
          auto-select-first
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          item-text="name"
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
              {{ item.name }}
            </v-chip>
          </template>

          <template v-slot:item="{item}">
            <template>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
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
    roles: {
      query: require('~/graphql/queries/roles.graphql'),
      variables () {
        return {
          first: 100,
          orderBy: [{ field: 'name', order: 'ASC' }],
          search: this.search || undefined,
          page: 1
        }
      },
      update: data => data.roles.data
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
