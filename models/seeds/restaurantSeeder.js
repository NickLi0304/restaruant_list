const Restaurant = require("../restaurant");
const restaurantList = require("../../restaurant.json").results;
const db = require("../../config/mongoose");

db.once("open", () => {
  Restaurant
    .create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(err));
  console.log("mongodb connected!");
});
