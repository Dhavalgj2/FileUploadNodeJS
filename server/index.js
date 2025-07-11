require("dotenv").config(); // ✅ Load environment variables
const express = require("express");
const path = require("path");
const connectDB = require("./src/config/db");
const app = express();

const cors = require("cors");

app.use(cors());
connectDB();
app.use(express.json());
const uploadFilesRoute = require("./src/routes/uploadFileRoutes");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", uploadFilesRoute);

app.listen(3000);
