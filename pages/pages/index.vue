<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      height="null"
      class="py-2"
    >
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="4" sm="6">
          <v-toolbar-title>{{ $t('applications.pages.title') }}</v-toolbar-title>
        </v-col>
        <v-col cols="8" sm="6" class="d-flex align-center justify-end">
          <v-btn text>
            <v-icon>add</v-icon>
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <div class="">
      <v-list>
        <template
          v-for="page in pages"
        >
          <v-hover
            :key="page.id"
            v-slot:default="{ hover }"
          >
            <div>
              <v-list-item
                @click="editPage(page)"
              >
                <v-list-item-icon>
                  <v-icon
                    :class="{ 'grey--text lighten-1': hover }"
                    color="transparent"
                  >
                    drag_indicator
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="page.title" />
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn
                    icon
                    @click.stop="editPage(page)"
                  >
                    <v-icon
                      :class="{ 'grey--text lighten-1': hover }"
                      color="transparent"
                    >
                      edit
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-btn
                    icon
                    @click.stop="editPage(page)"
                  >
                    <v-icon
                      :class="{ 'grey--text lighten-1': hover }"
                      color="transparent"
                    >
                      delete
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>

              <v-divider />
            </div>
          </v-hover>
        </template>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import PAGES from '~/graphql/pages.gql'

export default Vue.extend({
  data: () => ({
    pages: []
  }),

  apollo: {
    pages: {
      query: PAGES
    }
  },

  methods: {
    editPage (page) {
      console.log('edit', page)
    },
    infoPage (page) {
      console.log('info', page)
    }
  }
})
</script>

<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
