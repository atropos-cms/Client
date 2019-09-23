import Vue from 'vue'
import Timeout from 'await-timeout'
import { DocumentNode } from 'graphql'
import Validation from '~/utils/validation/index'
import FlowControlException from '~/utils/exceptions/FlowControlException'

const updateCallback : {
  query: DocumentNode | null,
  callback: (store: object, data: object) => object
} = {
  query: null,
  callback: () => ({})
}

export default Vue.extend({
  data: () => ({
    saving: false
  }),

  methods: {
    async saveModel (mutation: DocumentNode, data: any, updateConstructor = updateCallback) {
      try {
        this.saving = true
        Validation.reset()

        await Promise.all([this._wrappedSaveModel(mutation, data, updateConstructor), Timeout.set(600)])
      } catch (error) {
        Validation.catchValidationErrors(error)
        throw new FlowControlException()
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
    }
  }
})
