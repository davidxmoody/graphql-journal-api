const {makeExecutableSchema} = require("graphql-tools")
const marked = require("marked")

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

const demoEntries = [
  {id: "1", date: "2014-04-04", rawContent: "hello *world*"},
  {id: "2", date: "2014-04-05", rawContent: "hello world 2"},
]

const resolvers = {
  Query: {
    entry: (_, {id}) => demoEntries.find((e) => e.id === id),
    entries: () => demoEntries,
  },
  Entry: {
    wordcount: ({rawContent}) => rawContent.split(" ").length,
    htmlContent: ({rawContent}) => marked(rawContent),
  },
}

module.exports = makeExecutableSchema({typeDefs, resolvers})
