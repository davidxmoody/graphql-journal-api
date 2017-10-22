const marked = require("marked")
const {join} = require("path")
const fs = require("fs")
const {flatten} = require("ramda")

const ENTRIES_DIR = join(process.env.DIARY_DIR, "entries")

function getMonthDirs() {
  return fs.readdirSync(ENTRIES_DIR).sort()
}

function getEntriesForMonth(month) {
  const filenames = fs.readdirSync(join(ENTRIES_DIR, month)).sort()
  return filenames.map((filename) => join(ENTRIES_DIR, month, filename))
}

function getAllEntryFilenames() {
  const months = getMonthDirs()
  return flatten(months.map(getEntriesForMonth))
}

module.exports = () => {
  return getAllEntryFilenames().map((filename) => {
    const id = filename.replace(/^.*\/diary-(\d+-.+)\.txt$/, "$1")
    const date = new Date(id.replace(/-.*$/, "") * 1000)
    const deviceName = id.replace(/^\d+-/, "")
    const rawContent = () => fs.readFileSync(filename).toString()
    const wordcount = () => rawContent().split(" ").length
    const htmlContent = () => marked(rawContent())

    return {
      id,
      date,
      deviceName,
      rawContent,
      wordcount,
      htmlContent,
    }
  })
}
