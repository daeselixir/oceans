/*const {
  json
} = require("body-parser");
const mongoose = require("mongoose");
const catchAsync = require('../validator/catchAsync');
const Ticket = require("../models/ticket.js");
var Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://daeselixir:mahuida1106@cluster0.to4nx.mongodb.net/oceans?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err) {
    if (err) throw err;

    console.log("Successfully connected");
  }
);

var db = mongoose.connection;
var MyModel = db.model("histories", new Schema({
  name: String
}));

exports.historialId = catchAsync(async (req, res, next) => {
  await MyModel.find({
    _id: req.params.id
  }, {
    collectionId: req.params.id,
    collectionName: req.params.id,
    diff: req.params.id,
    version: req.params.id,
  }, function (err, data) {
    if (!data) {
      return res.status(401).json({
        error: "history not found",
      })
    }
    return res.json(data)
  })
  next()

})


exports.getHistories = (req, res) => {
  MyModel.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(data);
  });
};*/