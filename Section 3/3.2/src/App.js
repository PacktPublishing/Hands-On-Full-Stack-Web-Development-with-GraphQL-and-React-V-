import React from 'react'
import ApolloClient from 'apollo-boost'
import Provider from './Provider'
import Cars from './Cars'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

const App = () => {
  return (
    <Provider client={client}>
      <Cars />
    </Provider>
  )
}

export default App
