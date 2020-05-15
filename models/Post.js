const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: Date,
  body: String,
  tags: [String]
  image: String
});

mongoose.model("posts", PostSchema);