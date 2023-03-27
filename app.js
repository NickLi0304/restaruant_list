const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
// Define server related variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //設定連線到mongoDB

const port = 3000;

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

// require handlebars in the project
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// routes setting
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log("error"));
});

app.get("/restaurant/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => console.log(err));
});
//進入更新資料頁面
app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((err) => console.log(err));
});
//更新資料
app.post("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim();
  const filterRestaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  res.render("index", { restaurants: filterRestaurants, keyword: keyword });
});

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
