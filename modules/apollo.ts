import ApolloClient from 'apollo-client'
import { GraphQLError } from 'graphql'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import Validation from '~/utils/validation/index'

const link = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      checkUnauthenticatedError(err)
      checkGraphQLRequiredError(err)
    }
  }
})

const cache = new InMemoryCache()
const batchHttpLink = new BatchHttpLink({
  uri: 'http://tenant.atropos-server.test/graphql'
})
const apolloClient = new ApolloClient({
  link: ApolloLink.from([link, batchHttpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
})

export default () => apolloClient

const checkUnauthenticatedError = (err : GraphQLError) => {
  if (err.message === 'UNAUTHENTICATED') {
    window.location.replace('/auth/logout')
  }
}

const checkGraphQLRequiredError = (err : GraphQLError) => {
  if (err.message.includes('Expected non-nullable type String! not to be null')) {
    const regex = /Variable "\$([^"]*)".*value\.(.*)\./i
    const matches = err.message.match(regex)

    if (matches && matches?.length >= 3) {
      Validation.addError({
        key: `${matches[1]}.${matches[2]}`,
        validation: ['validation.required']
      })
    }
  }
}
