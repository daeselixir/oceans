const mongoose = require("mongoose");
const mongooseHistory = require("mongoose-history");

const { ObjectId } = mongoose.Schema;

const ticketSchema = new mongoose.Schema(
  {
    priority: {
      type: String,
      required: [true, "Please provide priority"],
      enum: {
        values: ["low", "medium", "tall"],
        message: "Priority is either : low , medium , tall",
      },
    },
    requerimentType: {
      type: String,
      required: [true, "Please provide  requeriment type"],
      enum: {
        values: ["software", "hardware", "other"],
        message: "Requeriment Type is either : software , harware , other",
      },
    },
    headerMessage: {
      type: String,
      required: [true, "Please provide header message"],
      maxlength: [40, "A header must have less or equal then 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      minlength: [
        10,
        "A description must have more or equal then 5 characters",
      ],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please provide user generate ticket"],
    },
  },
  {
    timestamps: true,
  }
);
var options = {
  metadata: [{ key: "headerMessage", value: "headerMessage" }],
};
ticketSchema.plugin(mongooseHistory, options);

module.exports = mongoose.model("Ticket", ticketSchema);
