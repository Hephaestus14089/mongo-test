const express = require('express');
const { ObjectId } = require('mongodb');
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

  let books = [];

  db.collection('books')
    .find() // returns 'cursor', i.e. a pointer that points to the collection
    .sort({ author: 1 })
    .forEach(book => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({error: "Could not fetch documents"});
    });

  // res.json({ mssg: "Welcome to the API" });
});

app.get('/books/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({_id: ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({error: "Could not fetch document"});
      });
  }
  else
    res.status(500).json({error: "Invalid document id"});
});
