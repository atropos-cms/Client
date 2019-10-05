<template>
  <v-card :loading="loading">
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
            v-model="model.first_name"
            :error-messages="$v('first_name', 'account.firstName')"
            :label="$t('user.firstName')"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="model.last_name"
            :error-messages="$v('last_name', 'account.lastName')"
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

      <v-btn
        color="primary"
        :loading="saving"
        @click="submit"
      >
        {{ $t('general.save') }}
      </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_ME from '~/graphql/UpdateMe.gql'
import ME from '~/graphql/Me.gql'

export default mixins(isForm, savesModels).extend({
  methods: {
    submit () {
      this.saveModel(UPDATE_ME, {
        data: {
          first_name: this.model.first_name,
          last_name: this.model.last_name,
          email: this.model.email,
          postcode: this.model.postcode,
          city: this.model.city,
          country: this.model.country
        }
      }, {
        query: ME,
        callback: (store, data) => ({ me: { ...store.me, ...data.updateMe } })
      })
        .then(this.updateModel)
    }
  }
})
</script>
