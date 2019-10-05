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

    <v-row class="pa-4">
      <v-col cols="12">
        Members
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import addMemberDialog from '../-modals/add-member.vue'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import SYNC_GROUP_MEMBERS from '~/graphql/syncGroupMembers.gql'
// import GROUP from '~/graphql/group.gql'
import { Preset } from '~/components/dialogs/isDialog'

export default mixins(isForm, savesModels).extend({
  methods: {
    async addMember () {
      await this.$dialog({
        title: this.$t('messages.addMemberToGroupTitle', this.model),
        component: addMemberDialog,
        preset: Preset.Save,
        action: model => this.$apollo.mutate({
          mutation: SYNC_GROUP_MEMBERS,
          variables: {
            id: this.model.id,
            members: model
          }
        })
      })
    }
  }
})
</script>
