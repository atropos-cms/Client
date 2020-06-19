<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('role.email') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="model.emailAddress"
              :error-messages="$v('emailAddress', 'role.emailAddress')"
              :label="$t('role.emailAddress')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-subheader class="pl-0">{{ $t('role.mailingList') }}</v-subheader>

            <v-radio-group
              v-model="model.mailingList"
              :error-messages="$v('mailingList', 'role.mailingList')"
              row
            >
              <v-radio :label="$t('role.mailingListItem.disabled')" value="Disabled"></v-radio>
              <v-radio :label="$t('role.mailingListItem.members')" value="Members"></v-radio>
              <v-radio :label="$t('role.mailingListItem.registered')" value="Registered"></v-radio>
              <v-radio :label="$t('role.mailingListItem.public')" value="Public"></v-radio>
            </v-radio-group>
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_ROLE from '~/graphql/mutations/updateRole.graphql'
import ROLE from '~/graphql/queries/role.graphql'

export default mixins(isForm, savesModels).extend({
  methods: {
    submit () {
      this.saveModel(UPDATE_ROLE, {
        id: this.model.id,
        data: {
          name: this.model.name,
          emailAddress: this.model.emailAddress,
          mailingList: this.model.mailingList
        }
      }, {
        query: ROLE,
        variables: { id: this.model.id },
        callback: (store, data) => ({ user: { ...store.role, ...data.updateRole } })
      })
        .then(this.updateModel)
        .then(() => this.$emit('refreshRole'))
    }
  }
})
</script>
