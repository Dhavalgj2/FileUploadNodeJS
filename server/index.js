require("dotenv").config(); // ✅ Load environment variables
const express = require("express");

const connectDB = require("./src/config/db");
const app = express();

const cors = require("cors");

app.use(cors());
connectDB();
app.use(express.json());
const uploadFilesRoute = require("./src/routes/uploadFileRoutes");

app.use("/", uploadFilesRoute);

app.listen(3000);
