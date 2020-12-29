const mongoose = require("mongoose");
const { Schema } = mongoose;

require("./User");

const USER_ACTIONS = ["FOLLOW", "LIKE", "POST", "COMMENT", "MENTION"];
const OBJECT_TYPES = ["POST", "COMMENT", "MESSAGE", ""];

const NotificationsSchema = new Schema({
  text: String,
  activityType: {
    type: String,
    enum: USER_ACTIONS,
  },
  objectType: {
    type: String,
    enum: OBJECT_TYPES,
  },
  objectUrl: String,
  _recipientId: { type: Schema.Types.ObjectId, ref: "users" },
  _senderId: { type: Schema.Types.ObjectId, ref: "users" },
  timeSent: { type: Schema.Types.Date, default: Date.now() },
  isUnread: { type: Schema.Types.Boolean, default: true },
});

let NotificationsModel = mongoose.model("notifications", NotificationsSchema);

module.exports = NotificationsModel;
