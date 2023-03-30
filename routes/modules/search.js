const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

// 搜尋特定餐廳
router.get("/", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  Restaurant.find({})
    .lean()
    .then((restaurants) => {
      const filterRestaurantsData = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );
      res.render("index", { restaurants: filterRestaurantsData, keywords });
    })
    .catch((err) => console.log(err));
});

module.exports = router;