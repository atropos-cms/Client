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
        autofocus
        holder-id="codex-editor"
        save-button-id="save-button"
        :init-data="initData"
        @save="onSave"
        @ready="onReady"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { Editor } from 'vue-editor-js'
import savesModels from '~/mixins/savesModels.ts'
import UPDATE_PAGE from '~/graphql/mutations/updatePage.graphql'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm, savesModels).extend({
  components: {
    Editor
  },

  data: () => ({
    initData: {},
    initialized: false
  }),

  computed: {
    content () : Object {
      if (!this.model.content) {
        return {}
      }

      return this.model.content
    }
  },

  methods: {
    onReady () {
      if (this.initialized) {
        return
      }

      this.initData = JSON.parse(this.content.body)
      this.initialized = true
    },

    save () {
      console.time('t1')
      this.$refs.editor.save()
    },

    onSave (response) {
      this.saveModel(UPDATE_PAGE, {
        id: this.content.id,
        data: {
          body: JSON.stringify(response)
        }
      })

      console.timeEnd('t1')
      console.log(JSON.stringify(response))
    }
  }
})
</script>
