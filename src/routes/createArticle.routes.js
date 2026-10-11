const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
  res.send("hello the resource is created")
})


module.exports = router