const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer.middleware");
const uploadOnCloudinary = require("../utils/cloudinary");

router.post("/uploadToCloud", upload.single("image"), async (req, res) => {
  try {
    // Multer saves the uploaded file locally
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // Upload the local file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(
      req.file.path
    );

    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    // Send the Cloudinary URL to the client
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        url: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
