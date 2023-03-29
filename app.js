const express = require("express");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); 

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes");
require("./config/mongoose");

const app = express();

const port = 3000;


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
