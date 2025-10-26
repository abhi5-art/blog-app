const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    public_id: { type: String, required: true },    // Needed for deletion
    url: { type: String, required: true },          // Direct Cloudinary image URL
    format: String,                                 // Like 'jpg', 'png'
    resource_type: String,                          // image / video
    bytes: Number,                                  // File size in bytes
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const File = mongoose.model("file", fileSchema);
module.exports = File;
