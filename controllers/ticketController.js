const Ticket = require("../models/ticket.js");
const catchAsync = require("../validator/catchAsync");

const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;

//Conexion coleccion Historial

var Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://daeselixir:mahuida1106@cluster0.to4nx.mongodb.net/oceans?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) throw err;

    console.log("Successfully connected");
  }
);

var db = mongoose.connection;
var MyModel = db.model(
  "histories",
  new Schema({
    name: String,
  })
);

// Consultas

exports.ticketId = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    return res.status(401).json({
      error: "Ticket not found",
    });
  }
  req.params = ticket;
  next();
});

exports.readId = (req, res) => {
  return res.json(req.params);
};

exports.listTicket = (req, res) => {
  Ticket.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(data);
  });
};

exports.historialList = async (req, res) => {
  await MyModel.find({}, function (err, data) {
    if (!data) {
      return res.status(401).json({
        error: "histories not found",
      });
    }
    return res.json({
      status: "success",
      results: data.length,
      histories: data,
    });
  });
};

exports.historialId = catchAsync(async (req, res, next) => {
  await MyModel.find(
    { collectionId: ObjectId(req.params.historyId) },
    function (err, data) {
      if (!data) {
        return res.status(401).json({
          err: "histories not found",
        });
      }
      req.params = data;
      next();
      /*  return res.json({
        status: "success",
        result: data.length,
        data,
      });*/
    }
  );
});

exports.readHistoryId = (req, res) => {
  let history = req.params;
  return res.json({
    results: history.length,
    history,
  });
};

exports.createTicket = catchAsync(async (req, res) => {
  const newTicket = await Ticket.create(req.body);

  res.status(201).json({
    status: "sucess",
    data: {
      ticket: newTicket,
    },
  });
});

exports.updateTicket = catchAsync(async (req, res) => {
  let ticket = await Ticket.findOneAndUpdate(req.params.ticketId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "sucess",
    data: {
      ticket,
    },
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = req.params;
  await ticket.remove((err, ticket) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Ticket deleted",
    });
  });
});
