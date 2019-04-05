import React, { Component } from 'react'
import withProvider from './WithProvider'
import gql from 'graphql-tag'

class Cars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carsById: {},
      loading: true
    }
    this.loadData = this.loadData.bind(this)
  }
  async loadData () {
    const cars = await this.props.client.query({
      query: gql`
        {
          carsById(id: "1") {
            color
            brand
            parts {
              name
            }
          }
        }
      `
    })
    this.setState({
      carsById: cars.data.carsById,
      loading: cars.loading
    })
  }
  componentDidMount () {
    this.loadData()
  }
  render () {
    if (this.state.loading) {
      return 'Loading!'
    }
    return <div>{this.state.carsById.brand}</div>
  }
}

export default withProvider(Cars)
