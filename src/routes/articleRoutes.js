import express from "express";

import { getArticle, getArticles } from "../controllers/articleController.js";

const router = express.Router();

router.route("/:articleId").get(getArticle);

router.route("/").get(getArticles);

export default router;
