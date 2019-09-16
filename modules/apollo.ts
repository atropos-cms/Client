import ApolloClient from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import EchoLink from './apollo-echo-link';

const cache = new InMemoryCache();
const batchHttpLink = new BatchHttpLink({
  uri: 'https://server.test/graphql',
});
const echoLink = new EchoLink();
const apolloClient = new ApolloClient({
  link: ApolloLink.from([echoLink, batchHttpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});


export default () => apolloClient
