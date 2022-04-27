/**
 * User schema file.
 */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Create User Schema.
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// Set User as a module, and set userSchema as a User model
module.exports = mongoose.model("User", userSchema);
