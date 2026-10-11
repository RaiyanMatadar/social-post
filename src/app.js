const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const createArticleRoutes = require("./routes/createArticle.routes")
const authRoutes = require("./routes/auth.routes")
const { errorHandler } = require('./middlewares/error.middleware')

app.use(express.json())
app.use(cookieParser())

app.use("/api/createArticle", createArticleRoutes)
app.use("/api/auth", authRoutes)

app.use(errorHandler);

module.exports = app