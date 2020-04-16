const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.listen("3000", () => {
  console.log("server is started and is running on port 3000");
});
