<template>
  <v-menu
    v-model="openMenu"
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

    <v-card class="pa-3">
      <v-container style="max-width: 20rem">
        <v-row
          align-content="start"
        >
          <v-col
            v-for="application in applications"
            :key="application.name"
            class="flex-grow-0"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                class="pa-2"
                outlined
                :style="{borderColor: hover ? undefined : 'transparent'}"
                @click="navigateTo(application)"
              >
                <div
                  class="d-flex align-center justify-center flex-column"
                  style="width:4em; height:4em"
                >
                  <!-- Application Icon -->
                  <v-icon
                    :size="36"
                    color="blue darken-2"
                  >
                    {{ application.icon }}
                  </v-icon>

                  <!-- Application Name -->
                  <div class="ma-1">
                    {{ $t(application.title) }}
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import usesApplications from '~/mixins/usesApplications.ts'
import { Application } from '~/utils/maps/applicationMap'

export default mixins(usesApplications).extend({
  data: () => ({
    openMenu: false
  }),

  methods: {
    navigateTo (application: Application) {
      this.openMenu = false
      this.$router.push(application.url)
    }
  }
})
</script>
