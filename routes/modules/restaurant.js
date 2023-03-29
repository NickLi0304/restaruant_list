const express = require("express");
const router = express.Router();
const Restaurant = require("./models/restaurant");

router.get("/restaurant/new", (req, res) => {
  return res.render("new");
});

router.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => console.log(err));
});
//進入更新資料頁面
router.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((err) => console.log(err));
});
//更新資料
router.put("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

// 刪除餐廳
router.delete("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});
// 搜尋特定餐廳
router.get("/search", (req, res) => {
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