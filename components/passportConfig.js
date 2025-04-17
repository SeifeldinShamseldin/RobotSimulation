// ---------------------- Import Required Modules ----------------------

// Import the Passport.js middleware for authentication
const passport = require('passport');

// Import the local authentication strategy (username and password based)
const LocalStrategy = require('passport-local');

// Import the User model which uses passport-local-mongoose for authentication
const User = require('../models/User');

// ---------------------- Configure Passport Strategy ----------------------

// Use Passport's LocalStrategy to authenticate users using their username and password.
// The User.authenticate() method is provided by passport-local-mongoose plugin.
passport.use(new LocalStrategy(User.authenticate()));

// ---------------------- Session Handling ----------------------

// Serialize user to store only user ID in session
passport.serializeUser(User.serializeUser());

// Deserialize user to retrieve full user details from session using ID
passport.deserializeUser(User.deserializeUser());

// ---------------------- Export Configured Passport ----------------------

// Export the configured Passport instance so it can be used in the main server (index.js)
module.exports = passport;