<template>
  <v-row>
    <v-col
      cols="12"
    >
      <label class="v-label theme--light">
        {{ $t('website.content.navigationentry.content') }}
      </label>

      <editor
        ref="editor"
        :data="initData"
      />

      <!-- <editor
        autofocus
        holder-id="codex-editor"
        save-button-id="save-button"
        :init-data="initData"
        @save="onSave"
        @ready="onReady"
      /> -->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { OutputData } from '@editorjs/editorjs'
import { Content } from '~/typescript/graphql'
import Editor from '~/components/editors/default.vue'
import savesModels from '~/mixins/savesModels.ts'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm, savesModels).extend({
  components: {
    Editor
  },

  data: () => ({
    initData: {}
  }),

  computed: {
    content () : Content {
      return this.model.content
    }
  },

  created () {
    this.$emit('registerOnSaveHandler', { handler: this.saveHandler })
    this.initData = JSON.parse(this.content.body)
  },

  methods: {
    async saveHandler () {
      const response = await this.$refs.editor.save() as OutputData

      this.saveModel(require('~/graphql/mutations/updatePage.graphql'), {
        id: this.content.id,
        data: {
          body: JSON.stringify(response)
        }
      })
    }
  }
})
</script>
