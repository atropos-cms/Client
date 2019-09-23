import Vue from 'vue'
import { ApolloError } from 'apollo-server-core'

interface ValidationError {
  key: string,
  validation: [string]
}
interface ValidationState {
  errors: ValidationError[]
}

const state : ValidationState = Vue.observable({
  errors: []
})

class Validation {
  static reset () {
    state.errors = []
  }

  static catchValidationErrors (error : ApolloError) {
    for (const errors of error.graphQLErrors) {
      for (const [key, validation] of Object.entries(errors.extensions.validation)) {
        state.errors.push({ key, validation })
      }
    }
  }

  static errorMessage (key: string) : ValidationError | undefined {
    return state.errors.find(e => e.key === key)
  }
}

export default Validation