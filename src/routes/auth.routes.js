const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const express = require("express");
const { ApiError } = require("../utils/APIError");
const { APIResponse } = require("../utils/APIResponse");
const userModel = require("../models/user.model");
const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      throw new ApiError(422, "all fileds are required")

      // return res
      //   .status(422)
      //   .json(new ApiError(422, "Invalid credentials"));
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }]
    })

    if (isUserExist) {
      throw new ApiError(409, "user is already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username: username,
      email: email,
      password: hashPassword
    })

    const token = jwt.sign({
      id: newUser._id
    },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // 24hrs
    )

    res.cookie("token", token)

    return res.
      status(200)
      .json(new APIResponse(200, newUser, "user fetched succesfully"));

  } catch (error) {
    console.error(error.name);
    console.error("registration ERROR : ", error.message);
    return new ApiError(500, "internal server error", error.message)
  }
})

module.exports = router