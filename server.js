const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let user = {
  pseudo: "Guillaume",
  email: "guillaume@email.com",
  connections: []
};

app.get("/", (req, res) => {
  res.render("index", { user, insight: null });
});

app.post("/generate", (req, res) => {
  const calendar = JSON.parse(fs.readFileSync("./data/calendar.json"));
  const notes = JSON.parse(fs.readFileSync("./data/notes.json"));
  const emails = JSON.parse(fs.readFileSync("./data/emails.json"));

  let insight = "💡 Insight NOVIUM\n\n";
  insight += `Événements : ${calendar.length}\n`;
  insight += `Notes : ${notes.length}\n`;
  insight += `Emails entreprise : ${emails.length}\n`;
  insight += `Connexions actives : ${user.connections.length}`;

  res.render("index", { user, insight });
});

app.post("/updateProfile", (req, res) => {
  user.pseudo = req.body.pseudo;
  user.email = req.body.email;
  res.redirect("/");
});

app.post("/addConnection", (req, res) => {
  user.connections.push({
    provider: req.body.provider,
    email: req.body.providerEmail
  });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("NOVIUM running"));
