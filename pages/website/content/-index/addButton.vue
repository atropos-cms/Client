<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on">
        {{ $t('website.content.newContent') }}
      </v-btn>
    </template>
    <v-list>
      <!-- Page -->
      <v-list-item
        @click="addContent('Page')"
      >
        <v-list-item-icon>
          <v-icon>description</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.page.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.page.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Blog -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>dynamic_feed</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.blog.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.blog.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Events -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>event</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.events.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.events.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Link -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>link</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.link.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.link.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Folder -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>folder</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.folder.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.folder.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import createPage from '../-modals/create-page.vue'
import { ContentType } from '~/typescript/graphql'
import { Preset } from '~/components/dialogs/isDialog'
import CREATE_NAVIGATIONENTRY from '~/graphql/mutations/createNavigationentry.graphql'

export default {
  methods: {
    addContent (type: ContentType) {
      if (type === ContentType.Page) {
        this.addPage()
      }
    },

    async addPage () {
      await this.$dialog({
        title: this.$t('messages.createUserTitle'),
        component: createPage,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: CREATE_NAVIGATIONENTRY,
          variables: {
            data: { ...model, type: 'Page' }
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    }
  }
}
</script>
