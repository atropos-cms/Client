<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.firstName"
          :error-messages="$v('firstName', 'account.firstName')"
          :label="$t('user.firstName')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.lastName"
          :error-messages="$v('lastName', 'account.lastName')"
          :label="$t('user.lastName')"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-text-field
          v-model="model.email"
          :error-messages="$v('email', 'account.email')"
          :label="$t('user.email')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.postcode"
          :error-messages="$v('postcode', 'account.postcode')"
          :label="$t('user.postcode')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.city"
          :error-messages="$v('city', 'account.city')"
          :label="$t('user.city')"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-text-field
          v-model="model.country"
          :error-messages="$v('country', 'account.country')"
          :label="$t('user.country')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
})
</script>
