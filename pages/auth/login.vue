<template>
  <v-flex xs12 sm8 md8>
    <v-card :elevation="12">
      <v-layout row align-center>
        <v-flex xs12 lg6 class="pa-4">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <v-text-field
                v-model="credentials.username"
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
              />
              <v-text-field
                id="password"
                v-model="credentials.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="password"
                label="Password"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" type="submit" block large>
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-flex>
        <v-flex xs6 class="hidden-md-and-down blue-grey lighten-5">
          <v-img
            :src="require('~/static/svgs/undraw_authentication_fsn5.svg')"
            aspect-ratio="1"
            contain
            class="ma-4"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LOGIN_MUTATION from '~/graphql/mutations/login.graphql'

@Component({
  layout: 'guest'
})
export default class AuthLogin extends Vue {
  credentials = {
    username: null,
    password: null
  }
  showPassword = false

  async onSubmit() {
    const credentials = this.credentials
    try {
      const res = await this.$apollo
        .mutate({
          mutation: LOGIN_MUTATION,
          variables: { data: credentials }
        })
        .then(({ data }) => data && data.login)
      await this.$apolloHelpers.onLogin(res.access_token)
    } catch (e) {}
  }
}
</script>
