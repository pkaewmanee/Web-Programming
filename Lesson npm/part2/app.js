
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

// Load users.json
const users = JSON.parse(fs.readFileSync('users.json', 'utf8')).users;

// Middleware to log request details
app.use((req, res, next) => {
  console.log("Request: " + new Date(), req.method, req.url);
  next();
});

// Route to display user profile
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);

  if (user) {
    // Encrypt the password using SHA-1
    const hash = crypto.createHash('sha1')
                       .update(user.password)
                       .digest('hex');

    res.send(`
      <h1>User Profile</h1>
      <p>ID: ${user.id}</p>
      <p>Username: ${user.username}</p>
      <p>Password: ${hash}</p>
      <p>Full Name: ${user.fullname}</p>
    `);
  } else {
    res.status(404).send('<h1>User not found</h1>');
  }
});

// Start the server
app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});
