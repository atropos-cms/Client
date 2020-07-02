<template>
  <v-card outlined>
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
        <v-list-item @click="renameWorkspace">
          <v-list-item-icon>
            <v-icon>edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('general.rename') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Delete Role -->
        <v-list-item @click="deleteWorkspace">
          <v-list-item-icon>
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('collaboration.files.deleteWorkspace') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import renameWorkspace from '../../-modals/rename-workspace.vue'
import dayjs from '~/utils/dayjs'
import isForm from '~/mixins/isForm.ts'
import { Preset } from '~/components/dialogs/isDialog'

export default mixins(isForm).extend({
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
    async renameWorkspace () {
      const title = this.$t('collaboration.files.renameWorkspace')

      await this.$dialog({
        title,
        component: renameWorkspace,
        preset: Preset.Save,
        model: {
          name: this.model.name
        },
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/updateWorkspace.graphql'),
          variables: {
            id: this.model.id,
            data: model
          }
        })
      })
    },
    async deleteWorkspace () {
      await this.$confirm({
        title: this.$t('messages.deleteWorkspaceTitle'),
        message: this.$t('messages.deleteWorkspaceMessage', this.model),
        preset: Preset.Delete,
        action: () => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/deleteWorkspace.graphql'),
          variables: {
            id: this.model.id
          }
        }).then(() => {
          this.$router.push('/collaboration/files')
        })
      })
    }
  }
})
</script>
