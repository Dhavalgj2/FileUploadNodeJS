const express = require("express");

const router = express.Router();

const uploadController = require("../controller/uploadFileController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });

router.get("/getFiles", uploadController.getFiles);

router.get("/downloadFile/:filename", uploadController.downloadFile);

router.post(
  "/uploadFiles",
  upload.single("file"),
  uploadController.uploadFiles
);

module.exports = router;
