import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'

import { ApolloProvider } from 'react-apollo'
import Cars from './Cars'
import CarsTwo from './CarsTwo'
import CarsQuery from './CarsQuery'
import CarsRefetch from './CarsRefetch'
import CarsMutation from './CarsMutation'
import CarsMutationComponent from './CarsMutationComponent'
import AllCars from './AllCars'
import QuerySubscription from './QuerySubscription'
import Counter from './Counter'
import ReadCounter from './ReadCounter'

const httpLink = new HttpLink({
  uri: `http://localhost:4000/graphql`
})
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Counter />
      <ReadCounter />
      <AllCars />
      <CarsMutationComponent />
    </ApolloProvider>
  )
}

export default App
