<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('role.permissionsTitle') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <div
        v-for="(permissions, name) in roleedPermissions"
        :key="name"
      >
        <v-subheader>{{ $t(`role.permissionCategories.${name}`) }}</v-subheader>

        <v-row
          v-for="permission in permissions"
          :key="permission.id"
          align="center"
        >
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-switch
              :input-value="permission.active"
              :label="$t(`role.permissions.${permission.name}.name`)"
              @change="value => togglePermission(value, permission)"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="8"
            class="muted--text"
          >
            {{ $t(`role.permissions.${permission.name}.description`) }}
          </v-col>
        </v-row>
      </div>

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
import { groupBy } from 'lodash'
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'
import savesModels from '~/mixins/savesModels.ts'
import { Permission } from '~/typescript/graphql'

export default mixins(isForm, savesModels).extend({
  data: () => ({
    permissions: [] as Permission[],
    saving: false
  }),

  apollo: {
    permissions: {
      query: require('~/graphql/queries/permissions.graphql')
    }
  },

  computed: {
    mapPermissions () {
      const modelPermissions : Permission[] = (this.model && this.model.permissions) || []

      return this.permissions.map(p => ({
        ...p,
        active: !!modelPermissions.find(m => m.id === p.id)
      }))
    },

    roleedPermissions () {
      return groupBy(this.mapPermissions, 'category')
    }
  },

  methods: {
    togglePermission (active: boolean, permission: Permission) {
      if (active) {
        return this.model.permissions.push(permission)
      }

      this.model.permissions = this.model.permissions.filter((p: Permission) => p.id !== permission.id)
    },
    submit () {
      const permissions = this.model.permissions.map((p: Permission) => p.id)

      this.saveCallback(
        () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/syncRolePermissions.graphql'),
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
