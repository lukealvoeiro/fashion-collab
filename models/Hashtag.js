const mongoose = require("mongoose");
const { Schema } = mongoose;

const HashtagSchema = new Schema({
  text: String,
});

let HashtagModel = mongoose.model("hashtags", HashtagSchema);
// PostModel.SyncToAlgolia();

module.exports = HashtagModel;
