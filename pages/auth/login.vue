<template>
  <v-flex xs12 sm8 md8>
    <v-card :elevation="12">
      <v-layout row align-center>
        <v-flex xs12 lg6 class="pa-4">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <v-expand-transition>
                <v-alert
                  v-if="loginFailed"
                  type="error"
                  dense
                  outlined
                >
                  {{ $t('auth.error.incorrectLogin') }}
                </v-alert>
              </v-expand-transition>
            </v-card-text>

            <v-card-text>
              <v-text-field
                v-model="credentials.email"
                autofocus
                name="email"
                :label="$t('auth.email')"
                type="text"
              />
              <v-text-field
                id="password"
                v-model="credentials.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :label="$t('auth.password')"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :loading="loading"
                color="primary"
                type="submit"
                block
                large
              >
                {{ $t('auth.login') }}
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
import Vue from 'vue'
import LOGIN from '~/graphql/mutations/login.graphql'
import { LoginInput } from '~/typescript/types'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',

  data: () => ({
    credentials: {
      email: 'admin@localhost',
      password: 'password'
    } as LoginInput,
    showPassword: false,
    loading: false,
    loginFailed: false
  }),

  methods: {
    async onSubmit () {
      const credentials = this.credentials

      try {
        this.loading = true

        const response = await this.$apollo
          .mutate({
            mutation: LOGIN,
            variables: { data: credentials }
          })
          .then(({ data }) => data && data.login)

        await this.$apolloHelpers.onLogin(response.accessToken)
        this.$router.push('/')
      } catch (error) {
        this.loginFailed = true
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
