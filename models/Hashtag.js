const mongoose = require("mongoose");
const { Schema } = mongoose;

const HashtagSchema = new Schema({
  text: String,
});

let PostModel = mongoose.model("hashtags", HashtagSchema);
// PostModel.SyncToAlgolia();

module.exports = PostModel;
