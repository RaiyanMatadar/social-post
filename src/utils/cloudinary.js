require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require("fs")

// // Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "social-post"
    })

    // Delete the temporary file after successful upload
    await fs.promises.unlink(localFilePath);

    // file has been uploaded succesfully 
    console.log("file is uploaded on coudinary", response.url);

    return response

  } catch (error) {
    console.error(error.message);

    await fs.unlink(localFilePath) // removes the
    // locally saved temporary files as the upload
    // operation got failed
    return null
  }
}

module.exports = uploadOnCloudinary;