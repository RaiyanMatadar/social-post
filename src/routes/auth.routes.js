const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(422).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check if username or email already exists
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { username }]
    });

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { _id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: 86400 /* 24 hours*/ }
    );

    // Store token in cookie
    res.cookie("token", token);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Check required fields
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // if user doesnt exist in database we cant login the user 
    const isUserExist = await userModel.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    });

    console.log(isUserExist);


    if (!isUserExist) {
      return res.status(422).json({
        success: false,
        message: "User is not exist"
      });
    }

    // checking if the password is correct for that perticuler user 
    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials"
      });
    }

    const token = jwt.sign(
      { _id: isUserExist._id },
      process.env.JWT_SECRET,
      { expiresIn: 86400 /* 24 hours*/ }
    );

    // Store token in cookie
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      data: {
        _id: isUserExist._id,
        username: isUserExist.username,
        email: isUserExist.email
      }
    })

  } catch (error) {
    console.error("login error:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
})

module.exports = router;