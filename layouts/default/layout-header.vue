<template>
  <v-app-bar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <span class="hidden-sm-and-down">Google Contacts</span>
    </v-toolbar-title>
    <v-text-field
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />

    <apps />

    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>

    <account />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Account from './header/account.vue'
import Apps from './header/apps.vue'

@Component({
  components: {
    Account,
    Apps
  }
})
export default class LayoutDefaultHeader extends Vue {}
</script>
