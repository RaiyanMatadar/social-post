const mongoose = require("mongoose")

const contentType = new mongoose.Schema({
  type: {
    type: String,
    enum: ['article', 'image'],
    required: true
  },

  textContent: { type: String },

  imageContent: {
    url: {
      type: String,
      required: function () { return this.type === 'image'; }
    },
    caption: {
      type: String,
      required: function () { return this.type === 'image'; }
    },
    altText: {
      type: String,
      required: function () { return this.type === 'image'; }
    }
  },
}, { _id: false })

const createArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },

  body: [contentType],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true 
  }
})

const createArticleModel = mongoose.model("Article", createArticleSchema)

module.exports = createArticleModel
