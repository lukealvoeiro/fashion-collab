const mongoose = require("mongoose");
const AWSUtil = require("../utils/AWSUtil");

module.exports = (app) => {
  app.get("/api/file/signed_url/", async (req, res) => {
    var signedUrl = await AWSUtil.sign(req.query.filename, req.query.filetype);
    res.send(signedUrl);
  });
};
