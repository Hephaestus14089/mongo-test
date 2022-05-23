const express = require('express');

// init app and middleware
const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

// routes
app.get('/books', (req, res) => {
  res.json({ mssg: "Welcome to the API" });
});
