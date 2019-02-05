module.exports = {
  FindinCol1: function(collection, query) {
    let q = query;
    let col = collection;
    let MongoClient = require('mongodb').MongoClient;
    let assert = require('assert');
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'scientific';
    let client = new MongoClient('mongodb://localhost:27017', {
      useNewUrlParser: true
    });

    return new Promise(function(resolve, reject) {
      client.connect(function(err, db) {
        // assert.equal(null, err);
        if (err) {
          reject(err);
        } else {
          // console.log(db);
          resolve(db);
        }
      });
    }).then(function(db) {
      let db1 = client.db('scientific');
      return new Promise(function(resolve, reject) {
        db1.collection(col).find(q).toArray(function(err, items) {
          if (err) {
            reject(err);
          } else {
            // console.log(items);
            resolve(items);
          }
        })
      })
    });
  },
  insertToDb: function(obj, col) {
    let MongoClient = require('mongodb').MongoClient;
    let assert = require('assert');
    // Connection URL
    let url = 'mongodb://localhost:27017';
    // Database Name
    let dbName = 'scientific';
    // Create a new MongoClient
    let client = new MongoClient(url, {
      useNewUrlParser: true
    });
    // Use connect method to connect to the Server
    client.connect(function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      let db = client.db(dbName);
      // Insert a single document
      db.collection(col).insertOne(obj, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
      });
    });
  }
}
