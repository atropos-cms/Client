import Vue from 'vue'
import Timeout from 'await-timeout'
import { DocumentNode } from 'graphql'

const updateCallback : {
  query: DocumentNode | null,
  callback: (store: object, data: object) => object
} = {
  query: null,
  callback: () => ({})
}

export default Vue.extend({
  data: () => ({
    saving: false,
    errors: null
  }),

  methods: {
    async saveModel (mutation: DocumentNode, data: any, updateConstructor = updateCallback) {
      try {
        this.saving = true

        await Timeout.wrap(this._wrappedSaveModel(mutation, data, updateConstructor), 600)
      } catch (error) {
        this.validationErrors(error)
      } finally {
        this.saving = false
      }
    },

    _wrappedSaveModel (mutation: DocumentNode, data: any, updateConstructor = updateCallback) {
      return this.$apollo
        .mutate({
          mutation,
          variables: { data },
          update: (store, { data }) => {
            if (!updateConstructor.query || !updateConstructor.callback) { return }

            const storeData: {}|null = store.readQuery({ query: updateConstructor.query })

            if (!storeData) { return }

            const updatedData = updateConstructor.callback(storeData, data)
            store.writeQuery({ query: updateConstructor.query, data: updatedData })
          }
        })
    },
    validationErrors (error) {
      for (const errors of error.graphQLErrors) {
        this.errors = errors.extensions.validation
      }
    }
  }
})
