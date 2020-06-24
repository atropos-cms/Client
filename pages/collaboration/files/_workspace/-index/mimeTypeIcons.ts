import Vue from 'vue'
import { Folder, File } from '~/typescript/graphql'

export default Vue.extend({
  methods: {
    mimeTypeColor (item: Folder | File) {
      if (item.__typename === 'Folder') {
        return undefined
      }

      switch ((item as File).mimeType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg':
        case 'audio/mpeg':
        case 'audio/x-m4a':
          return 'indigo lighten-1'

        case 'application/pdf':
          return 'red darken-3'

        default:
          return 'mdi-file-outline'
      }
    },
    mimeTypeIcon (item: Folder | File) {
      if (item.__typename === 'Folder') {
        return 'mdi-folder'
      }

      switch ((item as File).mimeType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg':
          return 'mdi-file-image-outline'

        case 'audio/mpeg':
        case 'audio/x-m4a':
          return 'mdi-file-music-outline'

        case 'application/pdf':
          return 'mdi-file-pdf-outline'

        case 'application/zip':
          return 'mdi-zip-box-outline'

        case 'text/plain':
          return 'mdi-file-document-outline'

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return 'mdi-file-word-outline'

        default:
          return 'mdi-file-outline'
      }
    }
  }
})
