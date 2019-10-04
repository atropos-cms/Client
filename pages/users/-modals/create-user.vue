<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.first_name"
          :error-messages="$v('first_name', 'account.firstName')"
          :label="$t('account.firstName')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.last_name"
          :error-messages="$v('last_name', 'account.lastName')"
          :label="$t('account.lastName')"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-text-field
          v-model="model.email"
          :error-messages="$v('email', 'account.email')"
          :label="$t('account.email')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.postcode"
          :error-messages="$v('postcode', 'account.postcode')"
          :label="$t('account.postcode')"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="model.city"
          :error-messages="$v('city', 'account.city')"
          :label="$t('account.city')"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-text-field
          v-model="model.country"
          :error-messages="$v('country', 'account.country')"
          :label="$t('account.country')"
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
