const express = require('express');
const router = express.Router();

// Define a route specific to profiles
router.get('/', (req, res) => {
  res.json({ message: "List of user profiles" });
});

// Export the router
module.exports = router;
