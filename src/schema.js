const {makeExecutableSchema} = require("graphql-tools")

const typeDefs = `
  type Entry {
    id: String!
    date: String!
    rawContent: String
    htmlContent: String
    deviceName: String
  }

  type Query {
    entries: [Entry]!
  }
`

const demoEntries = [
  {id: "1", date: "2014-04-04", rawContent: "hello world", htmlContent: "<p>hello world</p>"},
  {id: "2", date: "2014-04-05", rawContent: "hello world 2"},
]

const resolvers = {
  Query: {
    entries: () => demoEntries,
  },
}

module.exports = makeExecutableSchema({typeDefs, resolvers})
