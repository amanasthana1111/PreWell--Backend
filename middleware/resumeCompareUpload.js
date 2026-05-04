import multer from "multer";
import fs from "fs";
import path from "path";

const FIVE_MB = 5 * 1024 * 1024;
const filesDir = path.join(process.cwd(), "files");

if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^\w.\-]/g, "_");
    cb(null, `${Date.now()}-${file.fieldname}-${safeName}`);
  },
});

const resumeCompareUpload = multer({
  storage,
  limits: {
    fileSize: FIVE_MB,
    files: 2,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  },
});

const uploadResumeComparisonFiles = (req, res, next) => {
  resumeCompareUpload.fields([
    { name: "resumeA", maxCount: 1 },
    { name: "resumeB", maxCount: 1 },
  ])(req, res, (error) => {
    if (!error) {
      return next();
    }

    const message =
      error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
        ? "Each resume PDF must be 5MB or smaller"
        : error.message || "Invalid resume upload";

    const files = Object.values(req.files || {}).flat();
    files.forEach((file) => {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    return res.status(400).json({ message });
  });
};

export default uploadResumeComparisonFiles;
