<template>
  <v-card class="mt-12">
    <v-card-title>
      {{ $t('group.members') }}
    </v-card-title>

    <v-btn
      absolute
      dark
      fab
      top
      right
      color="pink"
      @click="addMember"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="model.members"
      :options.sync="options"
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
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import addMemberDialog from '../-modals/add-member.vue'
import { i18n } from '~/plugins/vue-i18n'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import ADD_GROUP_MEMBERS from '~/graphql/mutations/addGroupMembers.graphql'
import REMOVE_GROUP_MEMBERS from '~/graphql/mutations/removeGroupMembers.graphql'
// import GROUP from '~/graphql/group.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    headers: [
      { text: i18n.t('user.fullName'), value: 'full_name' },
      { text: i18n.t('general.actions'), value: 'action', align: 'right', sortable: false }
    ],
    options: {
      sortBy: ['full_name'],
      sortDesc: [false]
    }
  }),

  methods: {
    async addMember () {
      await this.$dialog({
        title: this.$t('messages.addMemberToGroupTitle', this.model),
        component: addMemberDialog,
        preset: Preset.Save,
        action: model => this.$apollo.mutate({
          mutation: ADD_GROUP_MEMBERS,
          variables: {
            id: this.model.id,
            members: model.selected
          }
        }).then(() => this.$emit('refreshGroup'))
      })
    },
    async removeMember (item: any) {
      await this.$confirm({
        title: this.$t('messages.removeMemberToGroupTitle', { full_name: item.full_name, name: this.model.name }),
        message: this.$t('messages.removeMemberToGroupMessage', item),
        preset: Preset.Remove,
        action: () => this.$apollo.mutate({
          mutation: REMOVE_GROUP_MEMBERS,
          variables: {
            id: this.model.id,
            members: [item.id]
          }
        }).then(() => this.$emit('refreshGroup'))
      })
    }
  }
})
</script>
