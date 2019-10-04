<template>
  <v-card :loading="loading">
    <v-card-title>
      {{ $t('account.personalInfo') }}
    </v-card-title>

    <v-form ref="form" class="pa-4">
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

      <div class="d-flex">
        <div class="flex-grow-1" />

        <v-btn
          color="primary"
          :loading="saving"
          @click="submit"
        >
          {{ $t('general.save') }}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_USER from '~/graphql/UpdateUser.gql'
import USER from '~/graphql/User.gql'

export default mixins(isForm, savesModels).extend({
  methods: {
    submit () {
      this.saveModel(UPDATE_USER, {
        id: this.model.id,
        data: {
          first_name: this.model.first_name,
          last_name: this.model.last_name,
          email: this.model.email,
          postcode: this.model.postcode,
          city: this.model.city,
          country: this.model.country
        }
      }, {
        query: USER,
        variables: { id: this.model.id },
        callback: (store, data) => ({ user: { ...store.user, ...data.updateUser } })
      })
        .then(this.updateModel)
    }
  }
})
</script>
