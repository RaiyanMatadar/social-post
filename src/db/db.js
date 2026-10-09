const mongoose = require("mongoose")

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.error("DB connection ERROR", error);
    process.exit(0);
  }
}

module.exports = connectDB