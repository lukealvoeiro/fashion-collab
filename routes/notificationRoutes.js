const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Notification = mongoose.model("notifications");

module.exports = (app) => {
  app.get("/api/user/notifications", requireLogin, async (req, res) => {
    try {
      const usersNotifications = await Notification.find({
        _recipientId: req.user._id,
      })
        .populate("_senderId")
        .sort({ timeSent: "descending" });
      res.send(usersNotifications);
    } catch (error) {
      res.send(error);
    }
  });
};
