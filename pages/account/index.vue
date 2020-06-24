<template>
  <div>
    <div class="d-none d-sm-flex flex-column align-center">
      <!-- Avatar -->
      <v-avatar
        :size="128"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'blue-grey lighten-5'"
        class="mt-6"
      >
        <v-img
          v-if="img"
          height="200px"
          contain
          :src="require('~/static/svgs/undraw_male_avatar_323b.svg')"
        />
        <span v-else>{{ me.initials }}</span>
      </v-avatar>

      <!-- Title -->
      <div class="mt-4 mb-8 display-2">
        {{ $t('user.welcome', me) }}
      </div>
    </div>

    <personal-info
      :value="me"
      :loading="$apollo.queries.me.loading"
    />

    <password
      :value="me"
      :loading="$apollo.queries.me.loading"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Password from './-form/password.vue'
import PersonalInfo from './-form/personal-info.vue'

export default Vue.extend({
  components: {
    Password,
    PersonalInfo
  },

  data: () => ({
    img: true,
    me: {}
  }),

  apollo: {
    me: { query: require('~/graphql/queries/me.graphql') }
  }
})
</script>
