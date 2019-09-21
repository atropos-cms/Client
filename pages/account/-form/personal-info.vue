<template>
  <div>
    <!-- Title -->
    <div
      class="title"
      v-text="$t('account.personalInfo')"
    />

    <v-card class="pa-4">
      <v-form
        ref="form"
        v-model="me"
        lazy-validation
      >
        <v-text-field
          v-model="me.first_name"
          :label="$t('account.firstName')"
        />

        <v-text-field
          v-model="me.last_name"
          :label="$t('account.lastName')"
        />

        <v-btn
          color="primary"
          @click="submit"
        >
          Save
        </v-btn>
      </v-form>

    </v-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

const UPDATE_ME_MUTATION = gql`
mutation($data: UpdateUserInput!) {
  updateMe(data: $data) {
    first_name
    last_name
    initials
  }
}`

export default Vue.extend({
  data: () => ({
    loading: false,
    me: {}
  }),

  apollo: {
    me: gql`query {
      me {
        first_name
        last_name
      }
    }`
  },

  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }

      const data = this.me

      try {
        this.loading = true

        await this.$apollo
          .mutate({
            mutation: UPDATE_ME_MUTATION,
            variables: { data }
          })
          .then(({ data }) => data && data.login)

        this.$router.push('/')
      } catch (error) {
        // this.$validationErrors(error)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
