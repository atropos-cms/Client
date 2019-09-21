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
            color="blue-grey lighten-5"
          >
            <img
              v-if="img"
              src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
              alt="avatar"
            >
            <span v-else>{{ me.initials }}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ me.first_name }} {{ me.last_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ me.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
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
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import ME from '~/graphql/Me.gql'

export default Vue.extend({
  data: () => ({
    openMenu: false,
    img: false,
    me: {}
  }),

  apollo: {
    me: { query: ME }
  },

  methods: {
    async logout () {
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
