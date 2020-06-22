<template>
  <div>
    <toolheader>
      <add-button
        v-if="workspace"
        :workspace="workspace"
        @contentModified="contentModified"
      />
    </toolheader>

    <div>
      <v-data-table
        :value="[]"
        :headers="headers"
        :items="files"
        item-key="name"
        disable-pagination
        hide-default-footer
        @click:row="click"
      >
        <template v-slot:item.name="{ item }">
          <v-icon class="mr-2">
            mdi-folder
          </v-icon>
          <span>{{ item.name }}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import addButton from './-index/addButton.vue'
import WORKSPACE from '~/graphql/queries/workspace.graphql'

export default Vue.extend({
  components: {
    addButton
  },

  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Last modified', value: 'fat' },
      { text: 'File size', value: 'carbs' }
    ],
    files: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%'
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%'
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%'
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%'
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%'
      }
    ]
  }),

  apollo: {
    workspace: {
      query: WORKSPACE,
      variables () {
        return {
          id: this.$route.params.workspace
        }
      }
    }
  },

  methods: {
    contentModified () {
      this.$apollo.queries.workspace.refetch()
    },
    click (value, { select }) {
      select(true)
      console.log(value)
    }
  }
})
</script>
