const { MongoClient } = require('mongodb');

const dbPort = 27017;
const dbUrl = `mongodb://localhost:${dbPort}/bookstore`;

let dbConn;

module.exports = {

  connectToDB: (cb_func) => {
    MongoClient.connect(dbUrl)
               .then((client) => {
                 dbConn = client.db();
                 return cb_func();
               })
               .catch(err => {
                 console.log(err);
                 return cb_func(err);
               });
  },

  getDB: () => dbConn

}; // end of exports object
