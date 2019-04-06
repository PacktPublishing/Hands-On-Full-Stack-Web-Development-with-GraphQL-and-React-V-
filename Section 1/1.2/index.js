const { graphql, buildSchema } = require('graphql')

// define the schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`)

const resolvers = () => {
  const message = () => {
    return 'Hello world'
  }
  return { message }
}

// execute the query
const result = graphql(schema, '{ message }', resolvers())
console.log(result)
