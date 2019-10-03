<template>
  <v-dialog v-model="show" :max-width="options.width" persistent @keydown.esc="cancel">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text v-show="!!message" class="pa-4">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          :color="cancelButton.color"
          text
          @click.native="cancel"
        >
          {{ $t(cancelButton.text) }}
        </v-btn>
        <v-btn
          :color="confirmButton.color"
          :loading="loading"
          text
          @click.native="agree"
        >
          {{ $t(confirmButton.text) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isDialog from './isDialog'
import FlowControlException from '~/utils/exceptions/FlowControlException'

export default mixins(isDialog).extend({
  data: () => ({
    loading: false
  }),

  methods: {
    async agree () {
      if (this.dialog && this.dialog.action) {
        this.loading = true
        try {
          await this.dialog.action()
        } finally {
          this.loading = false
        }
      }
      this.resolve(true)
      this.show = false
    },
    cancel () {
      this.reject(new FlowControlException())
      this.show = false
    }
  }
})
</script>
