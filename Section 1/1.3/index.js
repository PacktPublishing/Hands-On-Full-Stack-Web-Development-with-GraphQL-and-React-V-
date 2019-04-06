const { graphql, buildSchema } = require('graphql')
// build the schema
const schema = buildSchema(`
  type Query {
    greeting(name: String): String
  }
`)
// create the resolver
const resolvers = () => {
  const greeting = args => {
    return `Hello ${args.name}`
  }
  return { greeting }
}
// execute the query
const executeQuery = async () => {
  const result = await graphql(
    schema,
    `
      {
        greeting(name: "John")
      }
    `,
    resolvers()
  )
  console.log(result)
}
executeQuery()
