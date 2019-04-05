import React from 'react'
import { Context } from './Provider'

const WithProvider = Component => {
  return props => (
    <Context.Consumer>
      {client => <Component {...props} client={client} />}
    </Context.Consumer>
  )
}

export default WithProvider
