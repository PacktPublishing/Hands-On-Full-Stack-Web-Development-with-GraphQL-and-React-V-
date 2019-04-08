import React, { Component } from 'react'
import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const CARS = gql`
  {
    allCars {
      brand
      id
    }
  }
`

const SUBSCRIPTION = gql`
  subscription {
    carInserted {
      id
      brand
    }
  }
`

class AllCars extends React.Component {
  componentDidMount () {
    this.props.subscribeToMore({
      document: SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const car = subscriptionData.data.carInserted
        const newCars = Object.assign({}, prev, {
          allCars: [car, ...prev.allCars]
        })
        return newCars
      }
    })
  }

  render () {
    return (
      <ul>
        {this.props.allCars.map(car => (
          <li key={car.id}>
            {car.brand}
            {car.id}
          </li>
        ))}
      </ul>
    )
  }
}

class Cars extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <>
        <Query query={CARS}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            return (
              <AllCars
                allCars={data.allCars}
                subscribeToMore={subscribeToMore}
              />
            )
          }}
        </Query>
        <Subscription subscription={SUBSCRIPTION}>
          {({ data, loading }) => {
            if (loading) return <div>Listening</div>
            return (
              <div>
                New Car Added:
                {data.carInserted.brand}
                {data.carInserted.id}
              </div>
            )
          }}
        </Subscription>
      </>
    )
  }
}

export default Cars
