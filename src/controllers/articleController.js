const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");
const Hotel = require("../models/Hotel.js");
const Article = require("../models/Article.js");

exports.getArticles = asyncWrapper(async function (req, res, next) {
  const articles = await Article.find().select("title thumbnail intro");

  res.status(200).json(articles);
});

exports.getArticle = asyncWrapper(async function (req, res, next) {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);

  if (!article) return next(new AppError(404, "article does not exists"));

  res.status(200).json(article);
});
