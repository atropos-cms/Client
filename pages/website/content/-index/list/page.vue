<template>
  <v-hover :key="navigationentry.id" v-slot:default="{ hover }">
    <div>
      <v-list-item @click="editNavigationentry(navigationentry)">
        <v-list-item-icon class="mr-4">
          <v-icon
            :class="{
              'grey--text lighten-1': !navigationentry.published,
              'primary--text': navigationentry.published
            }"
          >
            mdi-file-document-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content
          :class="{ 'grey--text lighten-1': !navigationentry.published }"
        >
          <v-list-item-title v-text="navigationentry.title" />
        </v-list-item-content>

        <v-list-item-content class="grey--text">
          <v-list-item-title v-text="navigationentry.slug" />
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click.stop="editNavigationentry(navigationentry)">
            <v-icon :class="{ 'grey--text lighten-1': hover }" :color="$vuetify.breakpoint.lgAndUp ? 'transparent' : ''">
              edit
            </v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action class="ml-0">
          <v-btn icon @click.stop="deleteNavigationentry(navigationentry)">
            <v-icon :class="{ 'grey--text lighten-1': hover }" :color="$vuetify.breakpoint.lgAndUp ? 'transparent' : ''">
              delete
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider />
    </div>
  </v-hover>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isNavigationentry from './isNavigationentry'

export default mixins(isNavigationentry).extend({
  computed: {
    content () {
      return ''
    }
  }
})
</script>
