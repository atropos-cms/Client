<template>
  <wrapper ref="editor" :config="config" :initialized="onInitialized" />
</template>

<script lang="ts">
import Vue from 'vue'
import { OutputData } from '@editorjs/editorjs'

import Header from '@editorjs/header'
import List from '@editorjs/list'
import CodeTool from '@editorjs/code'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Checklist from '@editorjs/checklist'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import RawTool from '@editorjs/raw'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'
import Wrapper from './wrapper.vue'

export default Vue.extend({
  components: {
    Wrapper
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
      require: true
    }
  },

  computed: {
    config () {
      return {
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3
            }
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          code: {
            class: CodeTool
          },
          paragraph: {
            class: Paragraph
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                imgur: true
              }
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3
            }
          },
          checklist: {
            class: Checklist
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M'
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message'
            }
          },
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author'
            }
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M'
          },
          delimiter: Delimiter,
          image: SimpleImage
        },
        onReady: () => {
          this.$emit('onReady')
        },
        onChange: () => {
          console.log('Now I know that Editor\'s content changed!')
        },
        onSave: () => {
          this.$emit('onSave')
        },
        data: this.data
      }
    }
  },
  methods: {
    onInitialized () {
      this.$emit('onInitialized')
    },
    save () : Promise<OutputData> {
      return this.$refs.editor.state.editor.save()
    }
  }
})
</script>
