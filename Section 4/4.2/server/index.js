const express = require('express')
const { createServer } = require('http')
const { PubSub } = require('apollo-server')
const { ApolloServer, gql } = require('apollo-server-express')

const pubsub = new PubSub()
const db = {
  cars: [
    {
      id: '1',
      brand: 'Ford',
      color: 'Blue',
      doors: 4,
      type: 'Sedan',
      parts: [{ id: '1' }, { id: '2' }]
    },
    {
      id: '2',
      brand: 'Tesla',
      color: 'Red',
      doors: 4,
      type: 'SUV',
      parts: [{ id: '1' }, { id: '3' }]
    }
  ],
  parts: [
    {
      id: '1',
      name: 'Transmission',
      cars: [{ id: '1' }, { id: '2' }]
    },
    {
      id: '2',
      name: 'Susspension',
      cars: [{ id: '1' }]
    }
  ]
}

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
 }
 type Query {
   carsByType(type:CarTypes!): [Car]
   carsById(id:ID!): Car
   allCars:[Car]
 }
 type Mutation {
   insertCar(brand: String!, color: String!, doors: Int!, type:CarTypes!): Car
 }
  type Subscription {
    carInserted: Car
  }

`)

// create the resolvers
const resolvers = {
  Query: {
    carsByType: (parent, args, context, info) => {
      return db.cars.filter(car => car.type === args.type)
    },
    carsById: (parent, args, context, info) => {
      return db.cars.filter(car => car.id === args.id)[0]
    },
    allCars: (parent, args, context, info) => db.cars
  },
  Mutation: {
    insertCar: (parent, { brand, color, doors, type }) => {
      const id = Math.random().toString()
      const car = {
        id: id,
        brand: brand,
        color: color,
        doors: doors,
        type: type
      }
      db.cars.push(car)
      pubsub.publish('CAR_INSERTED', {
        carInserted: car
      })
      return car
    }
  },
  Subscription: {
    carInserted: {
      subscribe: () => pubsub.asyncIterator(['CAR_INSERTED'])
    }
  }
}

const app = express()
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})
server.applyMiddleware({ app, path: '/graphql' })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server listens on 4000')
})
