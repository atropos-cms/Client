import Vue from 'vue'
import Timeout from 'await-timeout'
import { DocumentNode } from 'graphql'
import Validation from '~/utils/validation/index'
import FlowControlException from '~/utils/exceptions/FlowControlException'

interface UnsafeStoreObject {
  [key: string]: any;
}
const updateCallback : {
  query: DocumentNode | null,
  variables?: object | null,
  callback: (store: UnsafeStoreObject, data: UnsafeStoreObject) => object
} = {
  query: null,
  variables: null,
  callback: () => ({})
}

export default Vue.extend({
  data: () => ({
    saving: false
  }),

  methods: {
    async saveModel (mutation: DocumentNode, variables: object, updateConstructor = updateCallback) {
      try {
        this.saving = true
        Validation.reset()

        await Promise.all([this._wrappedSaveModel(mutation, variables, updateConstructor), Timeout.set(600)])
      } catch (error) {
        Validation.catchValidationErrors(error)
        throw new FlowControlException()
      } finally {
        this.saving = false
      }
    },

    _wrappedSaveModel (mutation: DocumentNode, variables: object, updateConstructor = updateCallback) {
      return this.$apollo
        .mutate({
          mutation,
          variables,
          update: (store, { data }) => {
            if (!updateConstructor.query || !updateConstructor.callback) { return }

            const storeData: UnsafeStoreObject|null = store.readQuery({
              query: updateConstructor.query,
              variables: updateConstructor.variables
            })

            if (!storeData) { return }

            const updatedData = updateConstructor.callback(storeData, data)
            store.writeQuery({ query: updateConstructor.query, data: updatedData })
          }
        })
    }
  }
})
