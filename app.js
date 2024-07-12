const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const folderRoutes = require("./routes/folder");
const imageRoutes = require("./routes/image");

dotenv.config();

const app = express();

// for parsing body
app.use(express.json());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// routes
//
//
// authentication routes
app.use("/auth", authRoutes);
// user routes
app.use("/user", userRoutes);
// folder routes
app.use("/folders", folderRoutes);
// image routes
app.use("/images", imageRoutes);

//
//
//

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
