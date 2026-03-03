const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

// Config
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Page principale
app.get("/", (req, res) => {
  res.render("index", { insight: null })
})

// Générer insight
app.post("/generate", (req, res) => {
  const calendar = JSON.parse(fs.readFileSync("./data/calendar.json"))
  const notes = JSON.parse(fs.readFileSync("./data/notes.json"))
  const emails = JSON.parse(fs.readFileSync("./data/emails.json"))

  let insight = "💡 Insight NOVIUM :\n"
  insight += `• Tu as ${calendar.length} événements cette semaine.\n`
  insight += `• Tu as ${notes.length} notes importantes.\n`
  insight += `• Tu reçois des emails de ${emails.length} entreprises.\n`

  res.render("index", { insight })
})

// Lancer serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`NOVIUM running on port ${PORT}`))
