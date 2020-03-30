<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on">{{ $t('page.newContent') }}</v-btn>
    </template>
    <v-list>
      <!-- Page -->
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>description</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('page.new.page.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('page.new.page.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Blog -->
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>dynamic_feed</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('page.new.blog.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('page.new.blog.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Events -->
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>event</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('page.new.events.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('page.new.events.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Link -->
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>link</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('page.new.link.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('page.new.link.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Folder -->
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-icon>
          <v-icon>folder</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('page.new.folder.title') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('page.new.folder.subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
export default {}
</script>
