import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CARS = gql`
  {
    allCars {
      brand
      id
    }
  }
`
const AllCars = () => {
  return (
    <Query query={CARS}>
      {({ loading, error, data, refetch, startPolling, stopPolling }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error</p>
        return (
          <div>
            <button onClick={() => refetch()}>Refetch All Cars </button>
            <button onClick={() => startPolling(1000)}>Start Polling </button>
            <button onClick={() => stopPolling()}>Stop Polling </button>
            <p>All Cars</p>
            {data.allCars.map(car => (
              <div key={car.id}>
                {car.id} {car.brand}
              </div>
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export default AllCars
