const mongoose = require("mongoose")

const contentType = new mongoose.Schema({
  type: {
    type: String,
    enum: [article, image],
    required: true
  },

  textContent: { type: String },

  imageContent: {
    type: String,
    url: { type: String, required: true },
    caption: { type: String, required: true },
    altText: { type: String, required: true }
  }
}, { _id: false })

const createArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },

  body: [contentType],

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const createArticleModel = mongoose.model("Article", createArticleSchema)

module.exports = createArticleModel