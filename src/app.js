const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const createArticleRoutes = require("./routes/createArticle.routes")
const authRoutes = require("./routes/auth.routes")

app.use(express.json())
app.use(cookieParser())

app.use("/api/createArticle", createArticleRoutes)
app.use("/api/auth", authRoutes)


module.exports = app