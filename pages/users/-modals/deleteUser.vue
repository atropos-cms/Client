<template>
  <v-dialog
    :value="show"
    max-width="290"
    @input="close"
  >
    <v-card>
      <v-card-title class="headline">
        Delete this user?
      </v-card-title>

      <v-card-actions>
        <div class="flex-grow-1" />

        <v-btn
          color="primary darken-1"
          text
          @click="close"
        >
          {{ $t('general.cancel') }}
        </v-btn>

        <v-btn
          color="red darken-1"
          text
          @click="close"
        >
          {{ $t('general.delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    selected: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  apollo: {
  },

  methods: {
    close () {
      this.$emit('update:show', false)
    }
  }
})
</script>
