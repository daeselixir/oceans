"use strict";
const mongoose = require("../../config/mongoose"),
  userSchema = require("./schemas").userSchema;

const history = {
  User: mongoose.model("user", userSchema),
};

module.exports = history;
