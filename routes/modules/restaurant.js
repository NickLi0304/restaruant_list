const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

router.get("/new", (req, res) => {
  return res.render("new");
});

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//進入更新資料頁面
router.get("/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((err) => console.log(err));
});
//更新資料
router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  const updateData = req.body;

  Restaurant.findById(id)
    .then((restaurant) => {
      for (const key in updateData) {
        if (key in restaurant) {
          restaurant[key] = updateData[key];
        }
      }
      return restaurant.save();
    })
    .then(() => {
      res.redirect(`/restaurants/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// 刪除餐廳
router.delete("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
