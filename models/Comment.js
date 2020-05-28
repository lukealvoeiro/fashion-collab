const mongoose = require("mongoose");
require("./User");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  forPost: { type: Schema.Types.ObjectId, ref: "posts" },
  numLikes: { type: Schema.Types.Number, default: 0 },
  createdOn: { type: Schema.Types.Date, default: Date.now() },
  text: String,
});

mongoose.model("comments", CommentSchema);
