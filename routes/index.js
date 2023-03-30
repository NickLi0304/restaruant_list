// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("./modules/restaurant");
const home = require("./modules/home");
const search = require("./modules/search");

router.use("/", home);
router.use("/search", search);
router.use("/restaurants", Restaurant);
// 匯出路由器
module.exports = router;
