// utils/upload.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // cloudinary config

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-posts", // Change folder name if you want
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit (change if needed)
});

module.exports = upload;
