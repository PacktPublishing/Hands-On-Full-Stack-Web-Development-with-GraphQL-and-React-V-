const { ApolloServer, gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')
const express = require('express')

class CarDataAPI extends RESTDataSource {
  async getCar () {
    const data = await this.get('http://localhost:5000/carData')
    return data
  }
}

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
    carsAPI:Car
  }
  type Mutation {
    insertCar(brand: String!, color: String!, doors: Int!, type:CarTypes!): [Car]!
  }
`)

// create the resolvers
const resolvers = {
  Query: {
    carsByType: (parent, args, context, info) => {
      return context.db.cars.filter(car => car.type === args.type)
    },
    carsById: (parent, args, context, info) => {
      return context.db.cars.filter(car => car.id === args.id)[0]
    },
    carsAPI: async (parent, args, context, info) => {
      return await context.dataSources.carDataAPI.getCar()
    }
  },
  // Car: {
  //   brand: (parent, args, context, info) => {
  //     return db.cars.filter(car => car.brand === parent.brand)[0].brand
  //   }
  // },
  Mutation: {
    insertCar: (_, { brand, color, doors, type }) => {
      context.db.cars.push({
        id: Math.random().toString(),
        brand: brand,
        color: color,
        doors: doors,
        type: type
      })
      return db.cars
    }
  }
}

const dbConnection = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(db)
    }, 2000)
  })
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => {
    return {
      carDataAPI: new CarDataAPI()
    }
  },
  context: async () => {
    return { db: await dbConnection() }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
const app = express()
app.get('/carData', function (req, res) {
  res.send({
    id: 'd',
    brand: 'Honda',
    color: 'Blue',
    doors: 4,
    type: 'Sedan'
  })
})

app.listen(5000)

/*
{
  carsAPI{
    brand
    doors
    type
  }
}
*/
