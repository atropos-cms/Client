<template>
  <v-menu
    v-model="openMenu"
    :close-on-content-click="false"
    :nudge-bottom="10"
    bottom
    left
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>person</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar
            :size="96"
            :color="$vuetify.theme.dark ? 'grey darken-3' : 'blue-grey lighten-5'"
          >
            <img
              v-if="img"
              :src="img"
              alt="avatar"
            >
            <span v-else>
              {{ me.initials }}
            </span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ me.firstName }} {{ me.lastName }}</v-list-item-title>
            <v-list-item-subtitle>{{ me.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              fab
              @click="navigateToAccount"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn depressed @click="logout">
          {{ $t('auth.logout') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    openMenu: false,
    img: null,
    me: {}
  }),

  apollo: {
    me: { query: require('~/graphql/queries/me.graphql') }
  },

  methods: {
    async logout () {
      await this.$apollo
        .mutate({
          mutation: require('~/graphql/mutations/logout.graphql')
        })
        .then(({ data }) => data && data.logout)

      await this.$apolloHelpers.onLogout()
      this.$router.push('/auth/login')
    },
    navigateToAccount () {
      this.openMenu = false
      this.$router.push('/account')
    }
  }
})
</script>
