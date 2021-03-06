const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // we're requiring the recipe.js file whic is in the models/

const app = express();
const hbs = require("hbs"); //Handlebars is a JavaScript library that helps developers create templates that bind data, which creates cleaner, more efficient code.

app.set("view engine", "hbs"); //to link the hbs files
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public")); // this one obligatory to connect css

hbs.registerPartials(__dirname + "/views/partials"); // this one binds the partial hbs to other hbs

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true }) //aynı sekilde mongoya baglanmak için yazılması grk
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/about", (request, response) => {
  response.render("about");
  // response.sendFile(/about.hbs`);
});

app.get("/contact", (request, response) => {
  response.render("contact");
  // response.sendFile(`${__dirname}/contact`);
});

app.get("/recipes", (request, response) => {
  Recipe.find()
    .then(data => {
      // response.json(data);
      // console.log(data);
      // response.locals.recipeContent = data;
      response.render("recipes", { recipeContent: data }); //Recipes sayfasının recipecontent'ini render yapıyor
    })
    .catch();
});

// app.get("/more", (request, response) => {
//   response.render("more");
// });

app.get("/more/:titleId", (req, res) => {
  // ASK HERE
  console.log(req.params.RecipeId);
  Recipe.findById(req.params.titleId)
    .then(data => {
      //res.json(data);
      console.log("more", data.body);

      res.render("more", { data });
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(3030, function() {
  console.log("app listening at port http://localhost:3030"); //live serverdan bağlanamazsın bu eklere ondan bunu yap
});
