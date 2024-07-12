const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const imageController = require("../controllers/image");

// POST/uploadImage
router.post("/uploadImage", isAuth, imageController.uploadImage);
// GET/getImages
router.get("/fetchImages", isAuth, imageController.fetchImages);
// GET/searchImages
router.get("/search", isAuth, imageController.searchImages);

module.exports = router;
