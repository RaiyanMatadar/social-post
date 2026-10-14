require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const createArticleRoutes = require("./routes/createArticle.routes")
const authRoutes = require("./routes/auth.routes")
const uploadRoutes = require("./routes/upload.routes");

app.use(express.json({ limit: "16kb"}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use("/api/upload", createArticleRoutes)
app.use("/api/auth", authRoutes)
app.use("/api", uploadRoutes)


app.post("/check", async (req, res) => {
  res.send("create route")
})


module.exports = app