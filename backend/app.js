/**
 * Express backend app file for the mean-app project's backend.
 *
 * @appJs
 */

const dotenv = require("dotenv"); // Neccessary for creating environmet secrets.
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // Import body-parser, first install it with npm i --save body-parser!
const mongoose = require("mongoose"); // Import mongoose, first install it with npm i --save mongoose!

const postsRoutes = require("./routes/posts"); // Import post routes.
const userRoutes = require("./routes/user"); // Import user routes.

// Create the express application.
const app = express();

// Configure dotenv and get the database connection information.
dotenv.config({ path: "./backend/secrets/secrets.env" });
const db_connect = process.env.DB_CONNECT;

// Connect to the database using mongoose.
mongoose
  .connect(db_connect)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json()); // Middleware for parsing json data.
app.use(bodyParser.urlencoded({ extended: false })); // Middleware for urlencoded data, its optional in this case.
app.use("/images", express.static(path.join("backend/images"))); // Declare images folder where the posts images are stored.

app.use((req, res, next) => {
  // Allow CORS in the app, necessary to communicate with the frontend.
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Set allowed headers in the application.
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // Set allowed methods in the application.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  // Continue app configuration.
  next();
});

// Define on which url, which routes will be used.
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// Define express application as an exportable module.
module.exports = app;
