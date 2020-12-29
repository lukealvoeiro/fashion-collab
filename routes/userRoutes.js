const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const Notification = mongoose.model("notifications");

module.exports = (app) => {
  app.post("/api/user/follow/", async (req, res) => {
    try {
      const { userId } = req.body;
      const currentUserId = req.user._id;
      const userFollowed = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { followers: currentUserId } },
        { new: true }
      );
      if (userFollowed) {
        const followingUser = await User.findOneAndUpdate(
          { _id: currentUserId },
          { $addToSet: { following: userId } }
        );
        const newNotification = await new Notification({
          text: "",
          activityType: "FOLLOW",
          objectType: "",
          objectUrl: "TODO",
          _recipientId: userFollowed._id,
          _senderId: mongoose.Types.ObjectId(followingUser._id),
        }).save();
        console.log(newNotification);
      }
      res.send(userFollowed);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/user/unfollow/", async (req, res) => {
    try {
      const { userId } = req.body;
      const currentUserId = req.user._id;

      const userUnfollowed = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { followers: currentUserId } },
        { new: true }
      );
      if (userUnfollowed) {
        await User.findOneAndUpdate(
          { _id: currentUserId },
          { $pull: { following: userId } },
          { new: true }
        );
      }
      res.send(userUnfollowed);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
