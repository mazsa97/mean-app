/**
 * Post route middlewares.
 */

const express = require("express");

// Import post controller.
const PostController = require("../controllers/posts");

// Import middlewares.
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/check-file");

// Create express router.
const router = express.Router();

// Post middlewares
router.post("", checkAuth, extractFile, PostController.createPost);
router.put("/:id", checkAuth, extractFile, PostController.updatePost);
router.get("", PostController.getPosts);
router.get("/:id", PostController.getPost);
router.delete("/:id", checkAuth, PostController.deletePost);

// Export posts router.
module.exports = router;
