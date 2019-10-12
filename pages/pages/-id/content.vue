<template>
  <v-row>
    <v-col
      cols="12"
    >

      <editor
        autofocus
        holder-id="codex-editor"
        save-button-id="save-button"
        :init-data="initData"
        @save="save"
        @ready="onReady"
        @change="onChange"
      />

    </v-col>
  </v-row>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { Editor } from 'vue-editor-js'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  components: {
    Editor
  }
})
</script>
