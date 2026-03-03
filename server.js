const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let user = {
  pseudo: "Guillaume",
  email: "guillaume@email.com",
  connections: []
};

/* DASHBOARD PRINCIPAL */
app.get("/", (req, res) => {
  const calendar = JSON.parse(fs.readFileSync("./data/calendar.json"));
  const notes = JSON.parse(fs.readFileSync("./data/notes.json"));
  const emails = JSON.parse(fs.readFileSync("./data/emails.json"));

  const summary = {
    events: calendar.length,
    notes: notes.length,
    emails: emails.length,
    connections: user.connections.length
  };

  res.render("index", { user, summary });
});

/* PROFIL */
app.get("/profile", (req, res) => {
  res.render("profile", { user });
});

/* PARAMÈTRES */
app.get("/settings", (req, res) => {
  res.render("settings", { user });
});

/* PAGE CONNEXION */
app.get("/connect", (req, res) => {
  res.render("connect", { user });
});

/* UPDATE PROFIL */
app.post("/updateProfile", (req, res) => {
  user.pseudo = req.body.pseudo || user.pseudo;
  user.email = req.body.email || user.email;
  res.redirect("/profile");
});

/* ADD CONNECTION */
app.post("/addConnection", (req, res) => {
  user.connections.push({
    provider: req.body.provider,
    email: req.body.providerEmail
  });
  res.redirect("/profile");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("NOVIUM running on port " + PORT));
