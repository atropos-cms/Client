<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-bottom="10"
    bottom
    left
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>apps</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex v-for="app in apps" :key="app.name">
            <v-btn text large fab>
              <v-icon>{{ app.icon }}</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class LayoutDefaultHeaderApp extends Vue {
  apps = [{
    name: 'Dashboard',
    icon: 'dashboard'
  }, {
    name: 'Blog',
    icon: 'comment'
  }, {
    name: 'Pages',
    icon: 'subject'
  }, {
    name: 'Admin',
    icon: 'settings'
  }]
}
</script>
