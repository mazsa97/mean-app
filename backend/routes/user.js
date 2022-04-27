/**
 * User route middlewares.
 */

const express = require("express");

// Import user controller.
const UserController = require("../controllers/user");

// Create express router.
const router = express.Router();

// User middlewares
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);

// Export user router.
module.exports = router;
