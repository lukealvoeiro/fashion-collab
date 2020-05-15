const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  );

  app.get("/api/user", async (req, res) => {
    const user = await User.findOne({ email: req.query.email });
    res.send(user);
  });

  app.post("/auth/register", async (req, res) => {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(200).send({
        success: false,
        message: "This email has already been taken.",
      });
    }
    try {
      const newUser = await new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      }).save();
      await req.login(newUser, function (err) {
        if (err) {
          res.status(500).send(err);
        }
        return res.status(200).send({ success: true, body: newUser });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
    }
  );

  // app.post("/auth/login", passport.authenticate("local-login"), (req, res) => {
  //   res.redirect("/api/current_user");
  //   // if (req.user) {
  //   //   return res.status(200).send({ success: true, body: req.user });
  //   // } else {
  //   //   console.log(req);
  //   //   return res.status(500).send(req);
  //   // }
  // });

  app.post("/auth/login", async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user) return res.send("Incorrect username or password");
      user.comparePassword(req.body.password, async (error, match) => {
        if (match) {
          await req.login(user, function (err) {
            if (err) {
              res.status(500).send(err);
            }
            return res.send({ success: true, body: user });
          });
        } else {
          return res.send("Incorrect password or password");
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
