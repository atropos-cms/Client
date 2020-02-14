import ApolloClient from 'apollo-client'
import Cookie from 'universal-cookie'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import nuxtConfig from '~/nuxt.config'

const link = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === 'UNAUTHENTICATED') {
        const cookies = new Cookie()
        cookies.remove(nuxtConfig.apollo.tokenName)
        // window.location.replace('/auth/login')
      }
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
