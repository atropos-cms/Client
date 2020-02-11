<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('group.groupInfo') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="model.description"
              :error-messages="$v('data.description', 'group.description', { max: 1000 })"
              :label="$t('group.description')"
              auto-grow
              counter
              :rows="2"
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_GROUP from '~/graphql/mutations/updateGroup.graphql'
import GROUP from '~/graphql/queries/group.graphql'

export default mixins(isForm, savesModels).extend({
  methods: {
    submit () {
      this.saveModel(UPDATE_GROUP, {
        id: this.model.id,
        data: {
          name: this.model.name,
          description: this.model.description
        }
      }, {
        query: GROUP,
        variables: { id: this.model.id },
        callback: (store, data) => ({ user: { ...store.group, ...data.updateGroup } })
      })
        .then(this.updateModel)
        .then(() => this.$emit('refreshGroup'))
    }
  }
})
</script>
