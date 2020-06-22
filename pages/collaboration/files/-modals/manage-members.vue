<template>
  <v-container>
    <v-btn
      fab
      left
      color="secondary"
      @click="addMember"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="model.members"
      :options.sync="options"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          @click="removeMember(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
})
</script>
