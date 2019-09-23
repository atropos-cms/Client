import Vue from 'vue'

// Definition for error response
interface GraphQLErrorResponse {
  graphQLErrors: GraphQLError[]
}
interface GraphQLError {
  extensions: {
    validation: object
  }
}

// definition for validation state
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

  static catchValidationErrors (error : GraphQLErrorResponse) {
    for (const errors of error.graphQLErrors) {
      for (const [key, validation] of Object.entries(errors.extensions.validation)) {
        state.errors.push({ key, validation })
      }
    }
  }

  static errors () : ValidationError[] {
    return state.errors
  }

  static errorMessage (key: string) : ValidationError | undefined {
    return state.errors.find(e => e.key === key)
  }
}

export default Validation