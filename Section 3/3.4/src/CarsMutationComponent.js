import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const INSERT_CAR = gql`
  mutation InsertCar(
    $brand: String!
    $color: String!
    $doors: Int!
    $type: CarTypes!
  ) {
    insertCar(brand: $brand, color: $color, doors: $doors, type: $type) {
      brand
      color
      id
    }
  }
`

const Cars = () => {
  return (
    <Mutation mutation={INSERT_CAR}>
      {(insertCar, { loading, data, error, called }) => {
        return (
          <div>
            <button
              onClick={() =>
                insertCar({
                  variables: {
                    brand: 'Honda',
                    color: 'Red',
                    doors: 4,
                    type: 'Coupe'
                  }
                })
              }
            >
              Insert
            </button>
            {loading ? <div>Loading!</div> : null}
            {data ? (
              <div>
                {data.insertCar.brand} {data.insertCar.id}{' '}
              </div>
            ) : null}
          </div>
        )
      }}
    </Mutation>
  )
}

export default Cars
