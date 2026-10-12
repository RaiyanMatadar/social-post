const jwt = require("jsonwebtoken");
const express = require("express");
const createArticleModel = require("../models/createArticle.model");
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { title, body } = req.body

    const cookie = req.cookies.token;

    if (!cookie) {
      return res.status(401).json({ message: "No cookie found!" });
    }

    const decoded = jwt.verify(cookie, process.env.JWT_SECRET)

    await createArticleModel.create({
      title: title,
      body: body,
      author: decoded._id
    })

    res.status(201).json({
      success: true,
      message: "post created succesfully"
    })

  } catch (error) {
    // Update this line to match the actual route context
    console.error("Create article error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message // Sending error.message helps you debug on the frontend!
    });
  }
})


module.exports = router