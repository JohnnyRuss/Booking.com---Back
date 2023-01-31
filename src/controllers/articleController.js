import { AppError, asyncWrapper } from "../utils/index.js";
import Hotel from "../models/Hotel.js";
import Article from "../models/Article.js";

export const getArticles = asyncWrapper(async function (req, res, next) {
  const articles = await Article.find().select("title thumbnail intro");

  res.status(200).json(articles);
});

export const getArticle = asyncWrapper(async function (req, res, next) {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);

  if (!article) return next(new AppError(404, "article does not exists"));

  res.status(200).json(article);
});
