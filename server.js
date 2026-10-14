// require('dotenv').config();
const app = require("./src/app");
const connectDB = require('./src/db/db');

const PORT = process.env.PORT || 8000;

connectDB()

app.listen(PORT, () => {
  console.log(`the app is running on port : ${process.env.PORT}`);
})