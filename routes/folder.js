const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const folderController = require("../controllers/folder");

// POST/createFolder
router.post("/createFolder", isAuth, folderController.createFolder);
// GET/getFolders
router.get("/getFolders", isAuth, folderController.getFolders);

module.exports = router;
