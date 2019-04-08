import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CARS = gql`
  query CarsById($id: ID!) {
    carsById(id: $id) {
      brand
    }
  }
`
const Cars = () => (
  <Query query={CARS} variables={{ id: '1' }}>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return <div>{data.carsById.brand}</div>
    }}
  </Query>
)

export default Cars
