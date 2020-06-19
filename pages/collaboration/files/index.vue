<template>
  <div class="mt-6">
    <!-- <toolheader>
      <add-button @contentModified="contentModified" />
    </toolheader> -->

    <v-subheader>Workspaces</v-subheader>

    <v-row dense>
      <v-col cols="3" class="d-flex align-stretch">
        <v-card
          outlined
          class="d-flex flex-grow-1 flex-column"
        >
          <v-card-title
            class="headline cursor-pointer"
            @click="() => {}"
          >
            MG Waltenschwil
          </v-card-title>

          <v-list dense class="flex-grow-1">
            <v-subheader>Newest Files</v-subheader>
            <v-list-item two-line @click="() => {}">
              <v-list-item-avatar :size="26">
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
                <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-avatar :size="26">
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
                <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-avatar :size="26">
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
                <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-avatar :size="26">
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Jahreskonzert.pdf</v-list-item-title>
                <v-list-item-subtitle>Uploaded 3 days ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions class="justify-space-between">
            <v-btn text small color="primary">View workspace</v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex align-stretch">
        <v-card
          outlined
          class="d-flex flex-grow-1 flex-column"
        >
          <v-card-title class="headline">Musikkommussion</v-card-title>

          <div class="flex-grow-1">
            <!-- -->
          </div>

          <v-card-actions class="justify-space-between">
            <v-btn text small color="primary">View workspace</v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>

    <v-divider class="my-4"/>

    <v-row dense>
      <v-col cols="3">
        <v-card outlined>
          <v-img
            class="white--text align-end"
            height="200px"
            contain
            :src="require('~/static/svgs/undraw_folder_39kl.svg')"
          />

          <v-card-title class="headline">Create a new workspace</v-card-title>

          <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

          <v-card-actions class="justify-space-between">
            <v-btn
              outlined
              small
              color="primary"
              @click="createWorkspace"
            >
            {{ $t('collaboration.files.createWorkspace') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createWorkspace from './-modals/create-workspace.vue'
import { Preset } from '~/components/dialogs/isDialog'

export default Vue.extend({
  components: {
    // addButton
  },

  methods: {
    async createWorkspace () {
      const title = this.$t('collaboration.files.createWorkspace')

      await this.$dialog({
        title,
        component: createWorkspace,
        preset: Preset.Create,
        action: model => console.log(model)
      })
    }
  }
})
</script>
