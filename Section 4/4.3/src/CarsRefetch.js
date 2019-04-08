import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CARS = gql`
  query CarsById($id: ID!) {
    carsById(id: $id) {
      brand
      id
    }
  }
`
const Cars = () => (
  <Query query={CARS} variables={{ id: '1' }}>
    {({ loading, error, data, refetch, networkStatus }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return (
        <div>
          {data.carsById.brand} {data.carsById.id}
          <button onClick={() => refetch({ id: '2' })}>Refetch </button>
        </div>
      )
    }}
  </Query>
)

export default Cars
