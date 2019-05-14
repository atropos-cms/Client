<template>
  <v-card class="elevation-12">
    <v-form @submit.prevent="onSubmit">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
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
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit">
          Login
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  layout: 'blank',

  data: () => ({
    credentials: {
      username: null,
      password: null
    }
  }),

  methods: {
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
    },

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
}
</script>
