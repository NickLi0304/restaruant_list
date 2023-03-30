// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 定義首頁路由
router.get("/", (req, res) => {
  res.redirect("/restaurants");
});


// 匯出路由模組
module.exports = router;
