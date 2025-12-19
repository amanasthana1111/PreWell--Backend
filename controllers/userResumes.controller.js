import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import { User } from "../Models/user.schema.js";

const uploadResumes = async (req, res) => {
  try {
    const id = req.user_id;
    const UserData = await User.findOne({ _id: id })
    if (!UserData) {
      return res.json({
        message: "User Not found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const localFilePath = req.file.path;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "resumes",
    });
    console.log("enter")
    fs.unlinkSync(localFilePath);
    console.log("exit")
    const uri = result.secure_url
    const a = await User.findByIdAndUpdate({_id : id},{
      resumesLink : uri
    })
    if(!a){
      return res.json({
        message : "error"
      })
    }

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export default uploadResumes;
