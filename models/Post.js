const mongoose = require("mongoose");
const mongooseAlgolia = require("mongoose-algolia");
const { Schema } = mongoose;

require("./User");
const keys = require("../config/keys");

const PostSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
  createdOn: { type: Schema.Types.Date, default: Date.now() },
  description: String,
  tags: [String],
  image: String,
});

PostSchema.plugin(mongooseAlgolia, {
  appId: keys.algoliaAppID,
  apiKey: keys.algoliaAPIKey,
  indexName: keys.algoliaIndexName,
  selector: "-likedBy -createdOn",
  virtuals: {
    type: function (doc) {
      return "post";
    },
  },
  filter: function (doc) {
    return doc.description != null;
  },
  debug: true,
});
let PostModel = mongoose.model("posts", PostSchema);
// PostModel.SyncToAlgolia();

module.exports = PostModel;
