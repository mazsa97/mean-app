/**
 * Post schema file.
 */

const mongoose = require("mongoose");

// Create Post Schema.
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Set Posts as a module, and set PostSchema as a Post model.
module.exports = mongoose.model("Post", postSchema);
