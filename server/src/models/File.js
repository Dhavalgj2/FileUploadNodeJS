// models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
    },
    size: {
      type: Number,
    },
    path: {
      type: String,
    },
    url: {
      type: String,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "files" }
);

module.exports = mongoose.model("File", fileSchema);
