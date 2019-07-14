<template>
  <v-menu
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
          <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              :class="fav ? 'red--text' : ''"
              icon
              @click="fav = !fav"
            >
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="message" color="purple" />
          </v-list-item-action>
          <v-list-item-title>Enable messages</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="hints" color="purple" />
          </v-list-item-action>
          <v-list-item-title>Enable hints</v-list-item-title>
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
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class LayoutDefaultHeaderAccount extends Vue {
  async logout() {
    await this.$apolloHelpers.onLogout()
    this.$router.push('/auth/login')
  }
}
</script>
