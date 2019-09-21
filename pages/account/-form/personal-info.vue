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
        lazy-validation
      >
        <v-text-field
          v-model="model.first_name"
          :label="$t('account.firstName')"
        />

        <v-text-field
          v-model="model.last_name"
          :label="$t('account.lastName')"
        />

        <v-btn
          color="primary"
          :loading="saving"
          @click="submit"
        >
          Save
        </v-btn>
      </v-form>

    </v-card>

  </div>
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
      if (!this.$refs.form.validate()) {
        return
      }

      this.saveModel(UPDATE_ME, {
        first_name: this.model.first_name,
        last_name: this.model.last_name
      }, {
        query: ME,
        callback: (store, data) => ({ me: { ...store.me, ...data.updateMe } })
      })
    }
  }
})
</script>
