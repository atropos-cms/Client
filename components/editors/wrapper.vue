<template>
  <div>
    <div :id="holder" />
  </div>
</template>

<script lang="ts">
import {
  reactive,
  onMounted,
  defineComponent
} from '@vue/composition-api'

import EditorJS from '@editorjs/editorjs'

export default defineComponent({
  props: {
    holder: {
      type: String,
      default: () => 'vue-editor-js',
      require: true
    },
    config: {
      type: Object,
      default: () => ({}),
      require: true
    },
    initialized: {
      type: Function,
      default: () => {}
    }
  },
  setup: (props, _) => {
    const state = reactive({ editor: null })

    function initEditor (props) {
      destroyEditor()
      state.editor = new EditorJS({
        holder: 'vue-editor-js',
        ...props.config
      })
      props.initialized(state.editor)
    }

    function destroyEditor () {
      if (state.editor) {
        state.editor.destroy()
        state.editor = null
      }
    }
    onMounted(_ => initEditor(props))
    return { props, state }
  }
})
</script>
