<template>
  <v-dialog v-model="show" :max-width="options.width" persistent @keydown.esc="cancel">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>

      <v-card-text v-show="!!message" class="pa-4">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn :color="cancelButton.color" text @click.native="cancel">
          {{ cancelButton.text }}
        </v-btn>
        <v-btn :color="confirmButton.color" text @click.native="agree">
          {{ confirmButton.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isDialog from './isDialog'

export default mixins(isDialog).extend({
  methods: {
    agree () {
      this.resolve(true)
      this.show = false
    },
    cancel () {
      this.resolve(false)
      this.show = false
    }
  }
})
</script>
