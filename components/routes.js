// ---------------------- Import Required Modules ----------------------

// Import the Express framework
const express = require('express');

// Create a new Express Router instance to define route handlers
const router = express.Router();

// Import Passport.js for authentication
const passport = require('passport');

// Import the Mongoose User model (includes authentication helper functions)
const User = require('../models/User');


// ---------------------- Route Definitions ----------------------

// Redirect root URL "/" to the login page
router.get('/', (req, res) => res.redirect('/login'));


// ---------------------- Registration ----------------------

// Route: Display registration form
router.get('/register', (req, res) => res.render('register'));


// ---------------------- Login ----------------------

// Route: Show login form (also supports showing error messages via query parameter)
router.get('/login', (req, res) => {
  const error = req.query.error; // Get any error message passed in query
  res.render('login', { error }); // Render login form with optional error
});

// Route: Handle login submission with Passport authentication
router.post('/login', (req, res, next) => {
  // Use Passport's local strategy to authenticate user
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err); // Handle internal errors

    // If authentication fails (no user returned), redirect with error
    if (!user) {
      return res.redirect('/login?error=Password incorrect');
    }

    // If authentication is successful, log the user in and redirect to dashboard
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});


// ---------------------- Dashboard ----------------------

// Route: Render the dashboard page, but only if user is logged in
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    // If authenticated, pass user data to the view
    res.render('dashboard', { user: req.user });
  } else {
    // If not logged in, redirect to login page
    res.redirect('/login');
  }
});


// ---------------------- Logout ----------------------

// Route: Log the user out of the session and redirect to login
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});


// ---------------------- Export Routes ----------------------

// Export the router instance so it can be used in index.js
module.exports = router;