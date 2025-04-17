// ---------------------- Import necessary modules ----------------------
const express = require('express');                      // Web framework for building the app
const session = require('express-session');              // Middleware for managing sessions
const bodyParser = require('body-parser');               // Middleware to parse request bodies
const passport = require('./components/passportConfig'); // Custom Passport configuration
require('./components/db');                              // Establish MongoDB connection
const routes = require('./components/routes');           // Load route definitions

// ---------------------- Initialize Express Application ----------------------
const app = express();

// ---------------------- View Engine Setup ----------------------
app.set('view engine', 'ejs'); // Set EJS as the templating engine for rendering views

// ---------------------- Middleware Setup ----------------------
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// Configure session handling
app.use(session({
  secret: 'notagoodsecret', // Secret used to sign session ID cookie
  resave: false,            // Don't save session if unmodified
  saveUninitialized: false  // Don't create session until something is stored
}));

// Initialize Passport.js for authentication and session tracking
app.use(passport.initialize());
app.use(passport.session());

// ---------------------- Routes ----------------------
app.use('/', routes); // Mount all routes defined in components/routes.js at root

// ---------------------- Start Server ----------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});