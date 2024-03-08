// Import express
const express = require('express');

// Routes
const profileRoutes = require('./routes/profileRoutes');
const profilesRoutes = require('./routes/profilesRoutes');

// Dotenv
require('dotenv').config();

// Create an express application
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure auth
const { auth } = require('express-openid-connect');

const config = {
  authRequired: process.env.AUTH_REQUIRED === 'true',
  auth0Logout: process.env.AUTH0_LOGOUT === 'true',
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Use profileRoutes for any request that starts with '/profiles'
app.use('/profiles', profilesRoutes);

app.use('/profile', profileRoutes);

// Define a route for the homepage
app.get('/', (req, res) => {
  const message = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out';
  res.send(`Welcome to Unison! You are currently ${message}`);
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});