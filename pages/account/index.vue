<template>
<div>

  <div class="d-flex flex-column align-center">
    <!-- Avatar -->
    <v-avatar
      :size="128"
      color="blue-grey lighten-5"
    >
      <img
        v-if="img"
        src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
        alt="avatar"
      >
      <span v-else>{{ me.initials }}</span>
    </v-avatar>

    <!-- Title -->
    <div class="my-4 display-2">
      {{ $t('account.welcome', me) }}
    </div>
  </div>

    <personal-info />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import PersonalInfo from './-form/personal-info.vue'

export default Vue.extend({
  components: {
    PersonalInfo
  },

  data: () => ({
    img: false,
    me: {}
  }),

  apollo: {
    me: gql`query {
      me {
        first_name
        last_name
        initials
      }
    }`
  }
})
</script>
