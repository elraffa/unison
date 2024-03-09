// Import express
const express = require('express');
const cors = require('cors');


// Routes
const profileRoutes = require('./routes/profileRoutes');
const profilesRoutes = require('./routes/profilesRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Dotenv
require('dotenv').config();

// Create an express application
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// require db module
const client = require('./db');

// Use cors middleware
app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));

// Use express.json middleware
app.use(express.json());

// User
const User = require('./models/User');

// Configure auth
const { auth } = require('express-openid-connect');
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

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
//app.use('/callback', authRoutes);

// Define a route for the homepage
app.get('/', async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const user = req.oidc.user;

    // Check if the user already exists in the database
    let existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      // If the user doesn't exist, create a new user
      const newUser = {
        auth0Id: user.sub,
        username: user.nickname || `user_${user.sub}`,
      };

      existingUser = await User.create(newUser);
    }

    res.json(existingUser);
  } else {
    res.json({ message: 'You are currently logged out' });
  }
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

