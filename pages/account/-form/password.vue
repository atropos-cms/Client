<template>
  <v-card class="mt-12">
    <v-card-title>
      {{ $t('account.changePassword') }}
    </v-card-title>

    <v-form ref="form" class="pa-4">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="model.current_password"
            :append-icon="showCurrentPassword ? 'visibility' : 'visibility_off'"
            :type="showCurrentPassword ? 'text' : 'password'"
            :error-messages="$v('current_password', 'account.current_password')"
            :label="$t('account.current_password')"
            @click:append="showCurrentPassword = !showCurrentPassword"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="model.password"
            :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
            :type="showNewPassword ? 'text' : 'password'"
            :error-messages="$v('password', 'account.password')"
            :label="$t('account.password')"
            @click:append="showNewPassword = !showNewPassword"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="model.password_confirmation"
            :append-icon="showNewPasswordConfirm ? 'visibility' : 'visibility_off'"
            :type="showNewPasswordConfirm ? 'text' : 'password'"
            :error-messages="$v('password_confirmation', 'account.password_confirmation')"
            :label="$t('account.password_confirmation')"
            @click:append="showNewPasswordConfirm = !showNewPasswordConfirm"
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
import UPDATE_MY_PASSWORD from '~/graphql/UpdateMyPassword.gql'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    showCurrentPassword: false,
    showNewPassword: false,
    showNewPasswordConfirm: false
  }),

  methods: {
    async submit () {
      await this.saveModel(UPDATE_MY_PASSWORD, { data: {
        current_password: this.model.current_password,
        password: this.model.password,
        password_confirmation: this.model.password_confirmation
      } })

      this.model = {}
    }
  }
})
</script>
