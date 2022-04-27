/**
 * Server backend app for the mean-app project.
 *
 * @serverJs
 */

const app = require("./app"); // Import backend express app
const debug = require("debug")("node-angular"); // Import debug module (part of node.js)
const http = require("http"); // Import http module

/**
 * Normalize the given value to be a correct port number.
 *
 * @param val The port needed normaliaztion.
 *
 * @returns The normalized port.
 */
const normalizePort = (val) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/**
 * Check the type of error if there is one, and show an error message according to that.
 *
 * @param error The error needed to be checked.
 *
 * @returns An error message based on the error's type.
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Function that will be run, when the server starts listening.
 *
 * @returns A debug message, which tells on what port the server is running.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// Set the servers port based on a environment variable or the given value. (Port: 3000)
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create the backend server.
const server = http.createServer(app);

// Bind error listener.
server.on("error", onError);

// Bind listening listener.
server.on("listening", onListening);

// Start the server to listen on the specified port.
server.listen(port);
