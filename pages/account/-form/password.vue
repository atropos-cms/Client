<template>
  <div class="mt-12">
    <!-- Title -->
    <div
      class="headline"
      v-text="$t('account.changePassword')"
    />

    <v-card class="pa-4">
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="model.current_password"
              :error-messages="$v('current_password', 'account.current_password')"
              :label="$t('account.current_password')"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="model.password"
              :error-messages="$v('password', 'account.password')"
              :label="$t('account.password')"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="model.password_confirmation"
              :error-messages="$v('password_confirmation', 'account.password_confirmation')"
              :label="$t('account.password_confirmation')"
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
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_MY_PASSWORD from '~/graphql/UpdateMyPassword.gql'

export default mixins(isForm, savesModels).extend({
  methods: {
    async submit () {
      await this.saveModel(UPDATE_MY_PASSWORD, {
        current_password: this.model.current_password,
        password: this.model.password,
        password_confirmation: this.model.password_confirmation
      })

      this.model = {}
    }
  }
})
</script>
