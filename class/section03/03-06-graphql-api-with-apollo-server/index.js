import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `#graphql
  type Query {
    qqq: String
  }
`

const resolvers = {
  Query: {
    qqq: () => {
      return "zxxxxxxxxxx"
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server)

console.log(`🚀 Server ready at ${url}`) //4000

