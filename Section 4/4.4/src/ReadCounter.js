import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
class ReadCounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.readLocalData = this.readLocalData.bind(this)
  }

  readLocalData = async client => {
    const result = await client.query({
      query: gql`
        {
          counter @client
        }
      `
    })
    this.setState({
      counter: result.data.counter
    })
  }

  render () {
    return (
      <>
        <ApolloConsumer>
          {client => {
            return (
              <div>
                <button onClick={() => this.readLocalData(client)}>
                  Read From Local
                </button>
              </div>
            )
          }}
        </ApolloConsumer>

        <p> Read from store {this.state.counter}</p>
      </>
    )
  }
}
export default ReadCounter
