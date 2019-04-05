import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Cars from './Cars'
import CarsTwo from './CarsTwo'
import CarsQuery from './CarsQuery'
import CarsRefetch from './CarsRefetch'
import CarsMutation from './CarsMutation'
import CarsMutationComponent from './CarsMutationComponent'
const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Cars />
      <CarsTwo />
      <CarsQuery />
      <CarsRefetch />
      <CarsMutation />
      <CarsMutationComponent />
    </ApolloProvider>
  )
}

export default App
