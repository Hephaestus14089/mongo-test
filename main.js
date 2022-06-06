const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDB, getDB } = require('./db');

// init app and middleware
const app = express();
app.use(express.json());

// db connection
let db;

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

app.post('/books', (req, res) => {

  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({error: "Could not create document"});
    });
});

app.delete('/books/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({_id: ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: "Could not delete document"});
      });
  }
  else
    res.status(500).json({error: "Invalid document id"});
});
