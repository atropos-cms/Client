<template>
  <wrapper ref="editor" :config="config" :initialized="onInitialized" />
</template>

<script lang="ts">
import Vue from 'vue'
import { OutputData } from '@editorjs/editorjs'

import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import Quote from '@editorjs/quote'
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
          paragraph: {
            class: Paragraph
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                imgur: true,
                twitter: true,
                instagram: true
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
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author'
            }
          },
          delimiter: Delimiter,
          image: SimpleImage
        },
        onReady: () => {
          this.$emit('onReady')
        },
        onChange: () => {
          this.$emit('onChange')
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
