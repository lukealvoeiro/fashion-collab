const { text } = require("body-parser");
const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");
const Comment = mongoose.model("comments");
const Hashtag = mongoose.model("hashtags");
const HashtagPostRelations = mongoose.model("hashtagPostRelations");

module.exports = (app) => {
  app.get("/api/user/posts", async (req, res) => {
    try {
      const populateParam = {
        path: "posts",
        populate: { path: "_user" },
      };
      const foundUser = await User.findOne({
        _id: req.query.userId,
      }).populate(populateParam);
      const posts = Array.from(foundUser.posts).map(function (post) {
        let currPost = post.toObject();
        let index = currPost.likedBy.findIndex((element) => {
          return element.equals(req.user._id);
        });
        currPost.isLiked = index >= 0;
        return currPost;
      });
      let user = foundUser.toObject();
      delete user.posts;
      res.send({ posts: posts, user: user });
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/api/posts/all", async (req, res) => {
    const results = await Post.find({}).populate("_user");
    const posts = Array.from(results).map(function (post) {
      let currPost = post.toObject();
      let index = currPost.likedBy.findIndex((element) => {
        return element.equals(req.user._id);
      });
      currPost.isLiked = index >= 0;
      return currPost;
    });
    res.send({ posts: posts });
  });

  app.post("/api/posts/", async (req, res) => {
    const { description, filename } = req.body;
    const newPost = await new Post({
      _user: req.user.id,
      description: description || null,
      image: filename,
    }).save();
    const regexp = new RegExp("#([^\\s]*)", "g");
    const tags = description.match(regexp) || [];
    const tagsInDB = await Hashtag.find({
      text: {
        $in: tags,
      },
    });
    allTags = [];
    for (const hashtag of tags) {
      console.log("current hashtag: " + hashtag);
      let found = false;
      tagsInDB.forEach((foundTag) => {
        if (foundTag.text == hashtag) {
          found = foundTag;
        }
      });
      if (found) {
        allTags.push({ _hashtag: found._id, _post: newPost._id });
      } else {
        const newHashtag = await new Hashtag({ text: hashtag }).save();
        allTags.push({ _hashtag: newHashtag._id, _post: newPost._id });
      }
    }
    let newRelations = await HashtagPostRelations.create(allTags);
    let createdBy = await User.findOne({ _id: req.user.id });
    createdBy.posts.push(newPost.id);
    await createdBy.save();
    res.send(newPost);
  });

  app.post("/api/posts/like/", async (req, res) => {
    try {
      let { postId } = req.body;
      let post = await Post.findOne({ _id: postId }).populate("_user");
      console.log(post);
      let index = post.likedBy.indexOf(req.user._id);
      if (index < 0) {
        post.likedBy.push(req.user._id);
      } else {
        post.likedBy.splice(index, 1);
      }
      let modifiedPost = await post.save();
      res.send(modifiedPost);
    } catch (err) {
      res.send(err);
    }
  });

  app.post("/api/posts/comment/", async (req, res) => {
    try {
      let { postId, message } = req.body;
      let post = await Post.findOne({ _id: postId });
      if (post) {
        let newComment = await new Comment({
          _user: req.user.id,
          forPost: postId,
          text: message,
        });
      }
    } catch (err) {
      res.send(err);
    }
  });
};
