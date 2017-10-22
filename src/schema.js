const {makeExecutableSchema} = require("graphql-tools")
const getEntries = require("./getEntries")

const typeDefs = `
  type Entry {
    id: String!
    date: String!
    deviceName: String
    rawContent: String!
    htmlContent: String
    wordcount: Int
  }

  type Query {
    entry(id: String!): Entry
    entries: [Entry]!
  }
`

const resolvers = {
  Query: {
    entry: (_, {id}) => getEntries().find((e) => e.id === id),
    entries: getEntries,
  },
}

module.exports = makeExecutableSchema({typeDefs, resolvers})
