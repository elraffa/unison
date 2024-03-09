const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const User = require('../models/User'); // adjust the path to match your file structure

router.get('/', requiresAuth(), async (req, res) => {
  console.log('Callback route hit'); // Log when the route is hit

  const { user } = req.oidc;

  // Check if the user already exists in the database
  let existingUser = await User.findOne({ auth0Id: user.sub });

  if (existingUser) {
    // If the user already exists, return the user
    return res.send(JSON.stringify(existingUser));
  }

  if (!existingUser) {
    // If the user doesn't exist, create a new user
    const newUser = new User({
      auth0Id: user.sub,
      email: user.email,
      // Add any additional fields you need
    });

    existingUser = await newUser.save();

    console.log('New user created:', existingUser); // Log the new user's information

  }

  res.send(JSON.stringify(existingUser));
});

// Export the router
module.exports = router;