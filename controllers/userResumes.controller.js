import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const uploadResumes = async (req, res) => {
  try {
    const id = req._id;
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
    fs.unlinkSync(localFilePath);

    return res.status(201).json({
      success: true,
      fileUrl: result.secure_url,
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
