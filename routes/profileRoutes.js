const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  
// Export the router
module.exports = router;
