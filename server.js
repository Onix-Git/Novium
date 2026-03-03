const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let user = {
  pseudo: "Guillaume",
  email: "guillaume@email.com",
  connections: []
};

/* PAGE PRINCIPALE */
app.get("/", (req, res) => {
  res.render("index", { user });
});

/* PROFIL */
app.get("/profile", (req, res) => {
  res.render("profile", { user });
});

/* PARAMETRES */
app.get("/settings", (req, res) => {
  res.render("settings", { user });
});

/* PAGE CONNEXION */
app.get("/connect", (req, res) => {
  res.render("connect", { user });
});

/* UPDATE PROFIL */
app.post("/updateProfile", (req, res) => {
  user.pseudo = req.body.pseudo;
  user.email = req.body.email;
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

app.listen(3000, () => console.log("NOVIUM running"));
