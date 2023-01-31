const express = require("express");

const {
  getArticle,
  getArticles,
} = require("../controllers/articleController.js");

const router = express.Router();

router.route("/:articleId").get(getArticle);

router.route("/").get(getArticles);

module.exports = router;
