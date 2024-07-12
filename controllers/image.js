const Image = require("../models/Image");
const Folder = require("../models/Folder");

exports.uploadImage = async (req, res, next) => {
  const { name, url, user, folder } = req.body;
  try {
    const image = new Image({
      name,
      url,
      user,
      folder,
    });
    const parentFolder = await Folder.findById(folder);
    if (!parentFolder) {
      return res.status(400).json({ message: "Parent folder not found" });
    }
    parentFolder.images.push(image._id);
    await parentFolder.save();

    await image.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

exports.fetchImages = async (req, res, next) => {
  try {
    const { parentId } = req.query;
    const query = { user: req.userId };
    query.folder = parentId;
    const images = await Image.find(query);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ eror: error.Message });
  }
};

exports.searchImages = async (req, res, next) => {
  const { name } = req.query;
  try {
    const query = {
      user: req.userId,
      name: { $regex: name, $options: "i" }, // Case insensitive search
    };

    const images = await Image.find(query);

    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }
    res.status(200).json(images);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
