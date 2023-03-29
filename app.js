const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); 

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes");
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
app.use(methodOverride("_method"));
app.use(routes);




app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
