import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.writeToLocal = this.writeToLocal.bind(this)
  }

  writeToLocal = client => {
    client.writeData({
      data: { counter: this.state.counter + 1 }
    })
    this.setState({ counter: this.state.counter + 1 })
  }

  render () {
    return (
      <>
        <ApolloConsumer>
          {client => {
            return (
              <div>
                <button onClick={() => this.writeToLocal(client)}>
                  Write to Local
                </button>
              </div>
            )
          }}
        </ApolloConsumer>

        <p> Write to store {this.state.counter}</p>
      </>
    )
  }
}

export default Counter
