<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-avatar
          :size="96"
          color="blue-grey lighten-5"
        >
          <img
            v-if="img"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
            alt="avatar"
          >
          <span v-else>{{ model.initials }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ model.first_name }} {{ model.last_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ model.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
})
</script>
