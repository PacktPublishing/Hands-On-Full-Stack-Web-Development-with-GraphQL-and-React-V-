import React from 'react'
export const Context = React.createContext(null)

const Provider = props => {
  return (
    <Context.Provider value={props.client}>{props.children}</Context.Provider>
  )
}
export default Provider
