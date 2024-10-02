const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add your other routes and middleware here

// Important: For Vercel deployment, we export the app instead of calling app.listen()
module.exports = app;
