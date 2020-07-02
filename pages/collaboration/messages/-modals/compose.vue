<template>
  <div>
    <v-select
      v-model="model.recippients"
      :items="roles.data"
      dense
      multiple
      chips
      item-text="name"
      :loading="$apollo.queries.roles.loading"
      :error-messages="$v('recippients', 'account.recippients')"
      :label="$t('collaboration.messages.recippients')"
    />

    <v-text-field
      v-model="model.subject"
      dense
      :error-messages="$v('subject', 'account.subject')"
      :label="$t('collaboration.messages.subject')"
    />

    <v-textarea
      v-model="model.body"
      auto-grow
      :rows="10"
    />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  data: () => ({
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
        const first = 1
        const orderBy = [{
          field: 'name',
          order: 'DESC'
        }]

        return {
          first,
          orderBy,
          page: 1
        }
      },
      debounce: 200
    }
  }
})
</script>
