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
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit">
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-flex>
        <v-flex xs6 class="hidden-md-and-down grey lighten-3">
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
import gql from 'graphql-tag'

@Component({
  layout: 'guest'
})
export default class AuthLogin extends Vue {
  credentials = {
    username: null,
    password: null
  }

  async onSubmit() {
    const credentials = this.credentials
    try {
      const res = await this.$apollo
        .mutate({
          mutation: gql`
            mutation($data: LoginInput!) {
              login(data: $data) {
                access_token
                refresh_token
                expires_in
                token_type
              }
            }
          `,
          variables: { data: credentials }
        })
        .then(({ data }) => data && data.login)
      await this.$apolloHelpers.onLogin(res.access_token)
    } catch (e) {}

    this.me()
  }

  async me() {
    await this.$apollo.query({
      query: gql`
        query {
          me {
            id
            name
            email
            created_at
            updated_at
          }
        }
      `
    })
  }
}
</script>
