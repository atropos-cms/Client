<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      {{ $t('user.personalInfo') }}
    </v-card-title>

    <v-form ref="form" class="pa-4">
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="model.firstName"
            :error-messages="$v('firstName', 'user.firstName')"
            :label="$t('user.firstName')"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="model.lastName"
            :error-messages="$v('lastName', 'user.lastName')"
            :label="$t('user.lastName')"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            v-model="model.email"
            :error-messages="$v('email', 'user.email')"
            :label="$t('user.email')"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="model.postcode"
            :error-messages="$v('postcode', 'user.postcode')"
            :label="$t('user.postcode')"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="model.city"
            :error-messages="$v('city', 'user.city')"
            :label="$t('user.city')"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <v-text-field
            v-model="model.country"
            :error-messages="$v('country', 'user.country')"
            :label="$t('user.country')"
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

export default mixins(isForm, savesModels).extend({
  methods: {
    submit () {
      this.saveModel(require('~/graphql/mutations/updateUser.graphql'), {
        id: this.model.id,
        data: {
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          email: this.model.email,
          postcode: this.model.postcode,
          city: this.model.city,
          country: this.model.country
        }
      }, {
        query: require('~/graphql/queries/user.graphql'),
        variables: { id: this.model.id },
        callback: (store, data) => ({ user: { ...store.user, ...data.updateUser } })
      })
        .then(this.updateModel)
    }
  }
})
</script>
