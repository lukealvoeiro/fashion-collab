const mongoose = require("mongoose");
const { Schema } = mongoose;
// Schema describes what every individual record will look like

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  friends: [String],
  credits: { type: Number, default: 0 }
  //can also specify other things through an object, check mongoose documentation
});

mongoose.model("users", userSchema);
