<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('role.members') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="2">
          <v-btn
            fab
            left
            color="secondary"
            @click="addMember"
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
        :items="model.members"
        :options.sync="options"
        :search="search"
        :footer-props="{ itemsPerPageOptions: [10, 50, 100] }"
        item-key="id"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            @click="removeMember(item)"
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
import addMemberDialog from '../-modals/add-member.vue'
import { i18n } from '~/plugins/vue-i18n'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import { Preset } from '~/components/dialogs/isDialog'
import { User } from '~/typescript/graphql'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    headers: [
      { text: i18n.t('user.fullName'), value: 'fullName' },
      { text: i18n.t('user.email'), value: 'email' },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    search: '',
    options: {
      sortBy: ['full_name'],
      sortDesc: [false]
    }
  }),

  methods: {
    async addMember () {
      await this.$dialog({
        title: this.$t('messages.addMemberToRoleTitle', this.model),
        component: addMemberDialog,
        preset: Preset.Save,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/addRoleMembers.graphql'),
          variables: {
            id: this.model.id,
            members: model.selected
          }
        }).then(() => this.$emit('refreshRole'))
      })
    },
    async removeMember (user: User) {
      await this.$confirm({
        title: this.$t('messages.removeMemberToRoleTitle', { full_name: user.fullName, name: this.model.name }),
        message: this.$t('messages.removeMemberToRoleMessage', user),
        preset: Preset.Remove,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/removeRoleMembers.graphql'),
          variables: {
            id: this.model.id,
            members: [user.id]
          }
        }).then(() => this.$emit('refreshRole'))
      })
    }
  }
})
</script>
