const {makeExecutableSchema} = require("graphql-tools")
const getEntries = require("./getEntries")
const getCalendar = require("./getCalendar")
const lifeData = require("./lifeData.json")
const fs = require("fs")
const {join} = require("path")
const moment = require("moment")

const typeDefs = fs.readFileSync(join(__dirname, "/schema.graphql")).toString()

function getYears() {
  const currentDate = moment().format("YYYY-MM-DD")
  const {birthDate, deathDate, eras} = lifeData

  return getCalendar({
    currentDate,
    birthDate,
    deathDate,
    eras,
  }).years
}

const resolvers = {
  Query: {
    entry: (_, {id}) => getEntries().find((e) => e.id === id),
    entries: getEntries,
    years: getYears,
  },
}

module.exports = makeExecutableSchema({typeDefs, resolvers})
