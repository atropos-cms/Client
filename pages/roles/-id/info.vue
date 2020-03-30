<template>
  <v-card>
    <div class="d-flex flex-md-column pa-4">
      <div class="">
        <div class="title">
          {{ model.name }}
        </div>
        <div>{{ model.email }}</div>
        <div
          v-if="updatedAt"
          class="mt-3 caption muted--text"
        >
          {{ $t('general.updatedAt', { date: updatedAt }) }}
        </div>
        <div class="caption muted--text">
          {{ $t('general.createdAt', { date: createdAt }) }}
        </div>
      </div>
    </div>

    <v-divider />

    <v-list>
      <v-list-item-group>
        <!-- Rename Role -->
        <v-list-item @click="renameRole">
          <v-list-item-icon>
            <v-icon>edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('role.renameRole') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Delete Role -->
        <v-list-item @click="deleteRole">
          <v-list-item-icon>
            <v-icon>delete</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('role.deleteRole') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import renameRole from '../-modals/rename-role.vue'
import dayjs from '~/utils/dayjs'
import isForm from '~/mixins/isForm.ts'
import UPDATE_ROLE from '~/graphql/mutations/updateRole.graphql'
import DELETE_ROLE from '~/graphql/mutations/deleteRole.graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default mixins(isForm).extend({
  data: () => ({
    item: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' }
    ]
  }),

  computed: {
    createdAt () {
      if (!this.model.createdAt) { return null }
      return dayjs(this.model.createdAt).format('LL')
    },
    updatedAt () {
      if (!this.model.updatedAt) { return null }
      return dayjs(this.model.updatedAt).format('LL')
    }
  },

  methods: {
    async renameRole () {
      await this.$dialog({
        title: this.$t('messages.renameRoleTitle'),
        component: renameRole,
        preset: Preset.Save,
        action: model => this.$apollo.mutate({
          mutation: UPDATE_ROLE,
          variables: {
            id: this.model.id,
            data: model
          }
        })
      })
    },
    async deleteRole () {
      await this.$confirm({
        title: this.$t('messages.deleteRoleTitle'),
        message: this.$t('messages.deleteRoleMessage', this.model),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: DELETE_ROLE,
          variables: {
            id: this.model.id
          }
        }).then(() => {
          this.$router.push('/roles')
        })
      })
    }
  }
})
</script>
