import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Cars from './Cars'
import CarsTwo from './CarsTwo'
import CarsQuery from './CarsQuery'
import CarsRefetch from './CarsRefetch'
import CarsMutation from './CarsMutation'
import CarsMutationComponent from './CarsMutationComponent'
import AllCars from './AllCars'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CarsMutationComponent />
      <AllCars />
    </ApolloProvider>
  )
}

export default App
