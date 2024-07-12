const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("Folder", FolderSchema);
