<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('collaboration.files.roles') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="2">
          <v-btn
            fab
            left
            color="secondary"
            @click="addRole"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="10">
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="$t('general.search')"
            single-line
            hide-details
          />
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="model.roles"
        :options.sync="options"
        :search="search"
        :footer-props="{ itemsPerPageOptions: [10, 50, 100] }"
        item-key="id"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            @click="removeRole(item)"
          >
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import addRoleDialog from '../../-modals/add-role.vue'
import { i18n } from '~/plugins/vue-i18n'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import { Preset } from '~/components/dialogs/isDialog'
import { Role } from '~/typescript/graphql'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    headers: [
      { text: i18n.t('role.name'), value: 'name' },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    search: '',
    options: {
      sortBy: ['name'],
      sortDesc: [false]
    }
  }),

  methods: {
    async addRole () {
      await this.$dialog({
        title: this.$t('messages.addRoleToWorkspaceTitle', this.model),
        component: addRoleDialog,
        preset: Preset.Save,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/addRoleToWorkspace.graphql'),
          variables: {
            id: this.model.id,
            roles: model.selected
          }
        }).then(() => this.$emit('refreshWorkspace'))
      })
    },
    async removeRole (role: Role) {
      await this.$confirm({
        title: this.$t('messages.removeRoleFromWorkspaceTitle', { role_name: role.name, name: this.model.name }),
        preset: Preset.Remove,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/removeRoleFromWorkspace.graphql'),
          variables: {
            id: this.model.id,
            roles: [role.id]
          }
        }).then(() => this.$emit('refreshWorkspace'))
      })
    }
  }
})
</script>
