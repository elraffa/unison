const mongoose = require('mongoose');
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

module.exports = mongoose;