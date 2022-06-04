const express = require('express');
const { connectToDB, getDB } = require('./db');

// init app and middleware
const app = express();

let db;

// db connection
connectToDB((err) => {
  /*
    the call back function
    that the connectToDB function expects as 'cb_func'
    as its arguments
  */

  if (!err) {

    app.listen(3000, () => {
      console.log("listening on port 3000...");
    });

    db = getDB();

  } // end of outer if block
});



// routes
app.get('/books', (req, res) => {
  res.json({ mssg: "Welcome to the API" });
});
