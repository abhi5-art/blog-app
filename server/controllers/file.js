const File = require('../models/file');
const cloudinary = require('../utils/cloudinary');
const { validateExtension } = require("../validators/file");
const path = require("path");

// const uploadFile = async (req, res, next) => {
//   try {
//     if(!req.file){
//       res.code = 400;
//       throw new Error("File is not selected");
//     }
    
//     const ext = path.extname(file.originalname);
//     const isValidExt = validateExtension(ext);

//     if (!isValidExt) {
//       res.code = 400;
//       throw new Error("Only .jpg or .jpeg or .png format is allowed");
//     }

//     const file = new File({
//       public_id: req.file.filename,      // Same as public_id from Cloudinary
//       url: req.file.path,                // Cloudinary secure URL
//       format: req.file.format,
//       resource_type: req.file.resource_type,
//       bytes: req.file.size,
//       createdBy: req.user._id
//     });

//     await file.save();
//     res.status(201).json({
//       message : "File Uploaded succesfully...",
//       _id : file.public_id
//     });
//   } catch (error) {
//       next(error);
//   }
// };
const uploadFile = async (req, res, next) => {
  try {
    // Check if file exists FIRST
    if (!req.file) {
      res.code = 400;
      throw new Error("File is not selected");
    }

    // Define 'file' variable before using it
    const file = req.file;
    
    // Now you can use the 'file' variable
    const ext = path.extname(file.originalname);
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only .jpg or .jpeg or .png format is allowed");
    }

    // Create new File document
    const newFile = new File({
      public_id: file.filename,      // Same as public_id from Cloudinary
      url: file.path,                // Cloudinary URL
      secure_url: file.secure_url,   // Use secure_url if available
      format: file.format,
      resource_type: file.resource_type,
      bytes: file.size,
      original_filename: file.originalname,
      createdBy: req.user._id
    });

    await newFile.save();
    
    res.status(201).json({
      message: "File uploaded successfully",
      data: {
        _id: newFile._id,           // MongoDB _id
        public_id: newFile.public_id // Cloudinary public_id
      }
    });
    
  } catch (error) {
    next(error);
  }
};

const getFile = async (req, res, next) => {
    try{
         const {public_id} = req.query;
         if (!public_id) {
          return res.status(400).json({ message: "Missing public_id" });
        }
         const newFile = await File.findOne({public_id});
   
         if(!newFile){
            res.code = 400;
            throw new Error("File Not found");
         }

         const {url} = newFile;
         res.status(200).json({
              message : "File Url received succesfully...",
              data : url,
          });

        } catch(error) {
       next(error);
    }
}

const deleteFile = async (req, res, next) => {
   try{
       const {public_id} = req.query;
      console.log(public_id);
       if (!public_id) {
        return res.status(400).json({ message: "Missing public_id" });
      }

       //deletion from cloudinary
       await cloudinary.uploader.destroy(public_id);

       //deletion from mongo
       await File.findOneAndDelete({public_id});

       res.status(201).json({message : "File Deleted from mongo and cloud succesfully..."});

   }catch(error){
      next(error);
   }
};

module.exports = {
   uploadFile,
   getFile,
   deleteFile
}