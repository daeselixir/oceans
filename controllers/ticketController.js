const Ticket = require("../models/ticket.js");
const catchAsync = require("../validator/catchAsync");

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
