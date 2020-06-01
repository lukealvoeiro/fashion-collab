const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseAlgolia = require("mongoose-algolia");
const { Schema } = mongoose;

const keys = require("../config/keys");

SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  googleId: { type: String },
  facebookId: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  numPosts: { type: Number },
  posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  following: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

UserSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.plugin(mongooseAlgolia, {
  appId: keys.algoliaAppID,
  apiKey: keys.algoliaAPIKey,
  indexName: keys.algoliaIndexName,
  selector: "-password -firstName -lastName -posts",
  virtuals: {
    name: function (doc) {
      return `${doc.firstName} ${doc.lastName}`;
    },
    type: function (doc) {
      return "user";
    },
  },
  debug: true,
});
let UserModel = mongoose.model("users", UserSchema);
UserModel.SyncToAlgolia();

module.exports = UserModel;
