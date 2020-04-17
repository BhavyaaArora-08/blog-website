const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
var jsdom = require("jsdom");
$ = require("jquery")(new jsdom.JSDOM().window);

const app = express();

app.set("view engine", "hbs");

// Define paths for Express confug
const viewsPath = path.join(__dirname, "../templates/views");
const rootAddress = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup static directory to serve
app.use(express.static(rootAddress));

//data to b used
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//helper function
hbs.registerHelper("trimString", function (passedString) {
  var theString = passedString.substring(0, 100);
  return new hbs.SafeString(theString);
});

//my posts
var array = [];

app.get("/", (req, res) => {
  res.render("index", { data: homeStartingContent, array: array });
});

app.get("/about", (req, res) => {
  res.render("about", { data: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { data: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.post("/compose", (req, res) => {
  var obj = req.body;
  var str = obj.title;
  str = str.replace(/\s+/g, "-").toLowerCase();
  obj.href = "/" + str;
  array.push(obj);
  console.log(obj);
  res.redirect("/");
});

app.get("/:pos", function (req, res) {
  var topic = req.params.pos;
  topic = topic.replace(/-/g, " ");
  array.forEach(function (el) {
    if (el.title.toLowerCase() === topic) {
      res.render("post", el);
    }
  });
});

app.listen("3000", () => {
  console.log("server is started and is running on port 3000");
});
