const mongoose = require("mongoose");
const { Schema } = mongoose;

const HashtagPostRelationsSchema = new Schema({
  _hashtag: { type: Schema.Types.ObjectId, ref: "hashtags" },
  _post: { type: Schema.Types.ObjectId, ref: "posts" },
});

let HashtagPostRelationshipModel = mongoose.model(
  "hashtagPostRelations",
  HashtagPostRelationsSchema
);
module.exports = HashtagPostRelationshipModel;
