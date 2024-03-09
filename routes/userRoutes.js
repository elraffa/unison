const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { auth } = require('express-openid-connect');

// POST /users-register 
// Route for creating a new user
router.post('/', (req, res) => {
  const { username, auth0Id, instruments, bands } = req.body;

  const user = new User({
    username,
    auth0Id,
    instruments,
    bands
  });

  user.save()
    .then(() => res.json({ message: 'User saved successfully' }))
    .catch(err => {
      console.error('An error occurred:', err);
      res.status(500).json({ message: 'An error occurred' });
    });
});

// GET /users
// Route for getting all users
router.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => {
      console.error('An error occurred:', err);
      res.status(500).json({ message: 'An error occurred' });
    });
});

// GET /users/:id
// Route for getting a user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => res.json(user))
    .catch(err => {
      console.error('An error occurred:', err);
      res.status(500).json({ message: 'An error occurred' });
    });
});

module.exports = router;