import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Cars from './Cars'
import CarsTwo from './CarsTwo'
const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Cars />
      <CarsTwo />
    </ApolloProvider>
  )
}

export default App
