// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("./models/restaurant");
const home = require("./modules/home");

router.use("/", home);
router.use("/restaurant", Restaurant);
// 匯出路由器
module.exports = router;
