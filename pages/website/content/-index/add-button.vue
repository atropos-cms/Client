<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        absolute
        dark
        fab
        color="pink"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Page -->
      <v-list-item
        @click="addContent('Page')"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-document-outline</v-icon>
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
          <v-icon>mdi-post-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.blog.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.blog.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Gallery -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>mdi-image-multiple-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.gallery.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.gallery.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Events -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar-outline</v-icon>
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
          <v-icon>mdi-link</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('website.content.new.link.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('website.content.new.link.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- Folder -->
      <v-list-item
        disabled
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>mdi-folder-outline</v-icon>
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
import Vue from 'vue'
import createContent from '../-modals/create-content.vue'
import { ContentType } from '~/typescript/graphql'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  methods: {
    async addContent (type: ContentType) {
      const title = this.$t(`website.content.new.${type.toLowerCase()}.modal`)

      await this.$dialog({
        title,
        component: createContent,
        preset: Preset.Create,
        action: model => this.$apollo.mutate({
          mutation: require('~/graphql/mutations/createNavigationentry.graphql'),
          variables: {
            data: { ...model, type }
          }
        }).then(() => {
          this.$emit('contentModified')
        })
      })
    }
  }
})
</script>
