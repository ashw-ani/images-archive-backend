const Folder = require("../models/Folder");

exports.createFolder = async (req, res, next) => {
  const { name, parent, user } = req.body;
  try {
    const folder = new Folder({
      name,
      parent,
      user,
    });

    const existingFolder = await Folder.findOne({ name });
    if (
      existingFolder &&
      existingFolder.name === name &&
      existingFolder.parent === parent &&
      existingFolder.user.equals(user)
    ) {
      return res
        .status(400)
        .json({ message: "a folder with same name already exists" });
    }

    if (parent) {
      const parentFolder = await Folder.findById(parent);
      if (!parentFolder) {
        return res.status(400).json({ message: "Parent folder not found" });
      }
      parentFolder.children.push(folder._id);
      await parentFolder.save();
    }
    await folder.save();
    res.json(folder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

exports.getFolders = async (req, res) => {
  try {
    const { parentId } = req.query;
    const query = { user: req.userId };
    if (parentId) {
      query.parent = parentId;
    } else {
      query.parent = null;
    }
    // console.log(query);
    const folders = await Folder.find(query);
    // console.log(folders);
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
