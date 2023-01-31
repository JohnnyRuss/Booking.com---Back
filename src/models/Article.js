const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  thumbnail: String,
  intro: String,
  places: [
    {
      title: String,
      fig: String,
      description: String,
    },
  ],
});

const Article = model("Article", ArticleSchema);
module.exports = Article;
