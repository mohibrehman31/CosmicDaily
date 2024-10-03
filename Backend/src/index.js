const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const port = process.env.PORT || 3000;
// Create a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Cosmo Backend API');
});

// For local development
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}

// Export the Express app for Vercel
module.exports = app;
