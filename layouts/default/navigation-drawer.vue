<template>
  <v-navigation-drawer
    :value="drawer"
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    :width="mini ? 320 : 512"
    @input="setDrawer"
  >
    <v-layout fill-height>
      <v-navigation-drawer
        dark
        :mini-variant="mini"
        :mini-variant-width="mini ? 56 : 192"
        permanent
        style="transform: translateX(0) !important;"
      >
        <v-divider></v-divider>

        <v-list
          dense
          nav
        >

          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-list class="grow">
        <v-list-item
          v-for="link in links"
          :key="link"
          link
        >
          <v-list-item-title v-text="link"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { uiVuexNamespace } from '@/store/ui/const'

@Component({})
export default class LayoutDefaultSidebar extends Vue {
  @uiVuexNamespace.State('drawer')
  private drawer!: boolean

  @uiVuexNamespace.Mutation('setDrawer')
  private setDrawer!: () => void

  items = [
    { title: 'Home', icon: 'dashboard' },
    { title: 'About', icon: 'question_answer' },
  ]
  links = ['Home', 'Contacts', 'Settings']
  mini = true
}
</script>
