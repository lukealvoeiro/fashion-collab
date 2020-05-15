const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model("surveys"); // not requiring in the file directly because this will cause mongoose to error when testing

module.exports = (app) => {
  app.post("/api/form/new", (req, res) => {});
};
