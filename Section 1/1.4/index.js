const { graphql, buildSchema } = require('graphql')

// create a memory db
const db = {
  cars: [
    {
      id: 'a',
      brand: 'Ford',
      color: 'Blue',
      doors: 4,
      type: 'Sedan'
    },
    {
      id: 'b',
      brand: 'Tesla',
      color: 'Red',
      doors: 4,
      type: 'SUV'
    },
    {
      id: 'c',
      brand: 'Toyota',
      color: 'White',
      doors: 4,
      type: 'Coupe'
    },
    {
      id: 'd',
      brand: 'Toyota',
      color: 'Red',
      doors: 4,
      type: 'Coupe'
    }
  ]
}

// create the schema
const schema = buildSchema(` 
enum CarTypes {
   Sedan
   SUV
   Coupe
 }
 type Car {
     id: ID!
     brand: String!
     color: String!
     doors: Int!
     type: CarTypes!
  }
  type Query {
    carsByType(type:CarTypes!): [Car]
    carsById(id:ID!): Car
}
`)

// create the resolvers
const resolvers = () => {
  const carsByType = args => {
    return db.cars.filter(car => car.type === args.type)
  }
  const carsById = args => {
    return db.cars.filter(car => car.id === args.id)[0]
  }
  return { carsByType, carsById }
}
// execute the queries
const executeQuery = async () => {
  const queryByType = `
     {
      carsByType(type:TRUCK){
            brand
            color
            type
            id
         }
     }
    `
  const queryByID = `
    {
       carsById(id:null){
           brand
           type
           color
           id
        }
    }
   `
  const responseOne = await graphql(schema, queryByType, resolvers())
  console.log(responseOne)
  const responseTwo = await graphql(schema, queryByID, resolvers())
  console.log(responseTwo)
}
executeQuery()
