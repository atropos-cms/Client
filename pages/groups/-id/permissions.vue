<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('group.permissions') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row
        v-for="permission in mapPermissions"
        :key="permission.id"
        align="center"
      >
        <v-col cols="4">
          <v-switch
            :input-value="permission.active"
            :label="permission.name"
            @change="value => togglePermission(value, permission)"
          />
        </v-col>
        <v-col cols="8" class="muted--text">
          {{ permission.id }}
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import SYNC_GROUP_PERMISSIONS from '~/graphql/mutations/syncGroupPermissions.graphql'
import PERMISSIONS from '~/graphql/queries/permissions.graphql'
import { Permission } from '~/typescript/types'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    permissions: [] as Permission[],
    saving: false
  }),

  apollo: {
    permissions: {
      query: PERMISSIONS
    }
  },

  computed: {
    mapPermissions () {
      const modelPermissions : Permission[] = (this.model && this.model.permissions) || []

      return this.permissions.map(p => ({
        ...p,
        active: !!modelPermissions.find(m => m.id === p.id)
      }))
    }
  },

  methods: {
    togglePermission (active: boolean, permission: Permission) {
      if (active) {
        return this.model.permissions.push(permission)
      }

      this.model.permissions = this.model.permissions.filter(p => p.id !== permission.id)
    },
    submit () {
      const permissions = this.model.permissions.map(p => p.id)

      this.saveCallback(
        () => this.$apollo.mutate({
          mutation: SYNC_GROUP_PERMISSIONS,
          variables: {
            id: this.model.id,
            permissions
          }
        })
      )
    }
  }
})
</script>
