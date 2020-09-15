/*const mongoose = require("mongoose");
const History = mongoose.Collection("histories");

exports.listHistory = (req, res) => {
  History.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(data);
  });
};*/

const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://daeselixir:mahuida1106@cluster0.to4nx.mongodb.net/oceans?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
  if (err) throw new Error(err);
  var cursor = db.collection("histories").find(); // Read method 'find'
  cursor.each(function (err, doc) {
    if (err) throw new Error(err);
    if (doc != null) {
      console.log(doc); // Print all documents
    } else {
      db.close(); // Don't forget to close the connection when you are done
    }
  });
});
