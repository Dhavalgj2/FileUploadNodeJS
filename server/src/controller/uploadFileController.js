const fs = require("fs");
const path = require("path");
const File = require("../models/File");

const uploadsDir = path.join(__dirname, "../../uploads");
exports.getFiles = (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading upload directory:", err);
      return res.status(500).json({ error: "Unable to read uploaded files." });
    }

    // Optionally send filenames with URL path
    const fileList = files.map((filename) => ({
      name: filename,
      url: `http://localhost:3000/uploads/${filename}`, // optional if you serve static files
    }));

    res.json(fileList);
  });
};

exports.downloadFile = async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(uploadsDir, fileName);
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("File download failed");
    }
  });
};

exports.uploadFiles = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const fileRecord = await File.create({
      name: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `http://localhost:3000/uploads/${file.filename}`,
    });
    res.status(201).json(fileRecord);
  } catch (err) {
    console.error("MongoDB Save Error:", err);
    res.status(500).json({ error: "Failed to save file metadata" });
  }
};
