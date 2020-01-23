const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

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
      scope: ["email"]
    })
  );

  app.get("/auth/facebook/callback", passport.authenticate("facebook"));
};
