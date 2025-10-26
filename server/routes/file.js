const express = require('express');
const router = express.Router();
const AllController = require('../controllers');
const isAuth = require('../middlewares/isAuth');
// const upload = require('../middlewares/upload');
const upload = require("../middlewares/upload");
const cloudinary = require("../utils/cloudinary"); // cloudinary config

router.post(
    "/upload",
    isAuth,
    // upload.single("image"),uploads single file to local storage
    upload.single("image"),//2nd para is no of files at a time allowed to upload to local storage
    AllController.fileController.uploadFile
);

// Test route to check Cloudinary connection
router.get('/test-cloudinary', async (req, res) => {
  try {
    // Test Cloudinary connection by listing resources
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1
    });
    
    res.json({
      success: true,
      message: 'Cloudinary connected successfully',
      data: result
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    res.status(500).json({
      success: false,
      message: 'Cloudinary connection failed',
      error: error.message
    });
  }
});

router.get(
   "/getFile",
   isAuth,
   AllController.fileController.getFile,
);

router.delete(
  "/deleteFile",
  isAuth,
  AllController.fileController.deleteFile,
);



module.exports = router;