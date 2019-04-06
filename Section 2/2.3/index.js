const { ApolloServer, gql } = require('apollo-server')
// create a memory db
const cars = [
  {
    id: '1',
    brand: 'Toyota Corolla',
    color: 'Blue',
    doors: 4,
    type: 'Sedan',
    parts: [{ id: '1' }, { id: '2' }]
  },
  {
    id: '2',
    brand: 'Toyota Camry',
    color: 'Red',
    doors: 4,
    type: 'SUV',
    parts: [{ id: '1' }, { id: '3' }]
  }
]
const parts = [
  {
    id: '1',
    name: 'Transmission',
    cars: [{ id: '1' }, { id: '2' }]
  },
  {
    id: '2',
    name: 'Suspension',
    cars: [{ id: '1' }]
  }
]

// create the schema
const schema = gql(` 
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
  parts:[Part]
}
type Part {
   id: ID!
   name: String
   cars: [Car]
}
type Cars {
  cars:[Car]
}
  
  type Query {
    carsByType(type:CarTypes!): [Car]
    carsById(id:ID!): Car
    partsById(id:ID!): Part
  }
  type Mutation {
    insertCar(brand: String!, color: String!, doors: Int!, type:CarTypes!): [Car]!
  }
`)

// create the resolvers

const resolvers = {
  Query: {
    carsById: (parent, args, context, info) => args,
    carsByType: (parent, args, context, info) => args,
    partsById: (parent, args, context, info) => args
  },
  Part: {
    name: (parent, args, context, info) => {
      if (parts.filter(part => part.id === parent.id)[0]) {
        return parts.filter(part => part.id === parent.id)[0].name
      }
      return null
    },
    cars: (parent, args, context, info) => {
      return parts.filter(part => part.partId === parent.partId)[0].cars
    }
  },
  Car: {
    brand: (parent, args, context, info) => {
      return cars.filter(car => car.id === parent.id)[0].brand
    },
    type: (parent, args, context, info) => {
      return cars.filter(car => car.id === parent.id)[0].type
    },
    color: (parent, args, context, info) => {
      return cars.filter(car => car.id === parent.id)[0].color
    },
    doors: (parent, args, context, info) => {
      return cars.filter(car => car.id === parent.id)[0].doors
    },
    parts: (parent, args, context, info) => {
      return cars.filter(car => car.id === parent.id)[0].parts
    }
  },
  Cars: {
    cars: (parent, args, context, info) => {
      return cars.filter(car => car.type === parent.type)
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
