/**
 * Middleware for checking user authentication.
*/

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./backend/secrets/secrets.env" });
const secret_key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      secret_key
    );
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated." });
  }
};
