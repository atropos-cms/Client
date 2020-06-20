<template>
  <v-dialog
    v-model="show"
    :persistent="options.persistent"
    :max-width="options.width"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text
        v-if="message || component"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div v-if="message" class="pt-4" v-html="message" />
        <!--eslint-enable-->

        <form @submit.prevent="agree">
          <component :is="component" v-if="component" v-model="model" />
        </form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          :color="cancelButton.color"
          :text="!cancelButton.solid"
          @click.native="cancel"
        >
          {{ $t(cancelButton.text) }}
        </v-btn>
        <v-btn
          :color="confirmButton.color"
          :loading="loading"
          :text="!confirmButton.solid"
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
import Timeout from 'await-timeout'
import { cloneDeep } from 'lodash'
import isDialog from './isDialog'
import Validation from '~/utils/validation/index'
import FlowControlException from '~/utils/exceptions/FlowControlException'

export default mixins(isDialog).extend({
  data: () => ({
    loading: false,
    model: {}
  }),

  methods: {
    async agree () {
      Validation.reset()

      if (this.dialog && this.dialog.action) {
        this.loading = true
        try {
          await Promise.all([this.dialog.action(this.model), Timeout.set(600)])
        } catch (error) {
          await Timeout.set(300)
          Validation.catchValidationErrors(error)
          throw new FlowControlException()
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
  },

  watch: {
    show (value) {
      if (value && this.dialog) {
        // When the dialog becomes visible, set the model
        this.model = cloneDeep(this.dialog.model || {})
      } else {
        this.model = {}
      }
    }
  }
})
</script>
