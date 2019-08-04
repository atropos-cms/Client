<template>
  <v-app-bar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
  >
    <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)" />

    <v-toolbar-title class="hidden-sm-and-down mr-4">
      {{ $t('atropos.atropos') }}
    </v-toolbar-title>

    <v-spacer />
    <v-text-field
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      :label="$t('general.search')"
      class="hidden-sm-and-down"
    />
    <v-spacer />

    <!-- <apps /> -->

    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>

    <account />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { uiVuexNamespace } from '@/store/ui/const'
import Account from './header/account.vue'
import Apps from './header/apps.vue'

@Component({
  components: {
    Account,
    Apps
  }
})
export default class LayoutDefaultHeader extends Vue {
  @uiVuexNamespace.State('drawer')
  private drawer!: boolean

  @uiVuexNamespace.Mutation('setDrawer')
  private setDrawer!: () => void
}
</script>
