const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    // async retreival of user's credentials from mongodb, if not, create new user
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await new User({
        googleId: profile.id,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
      }).save();
      done(null, newUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      enableProof: true,
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await new User({
        facebookId: profile._json.id,
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        email: profile._json.email,
      }).save();
      done(null, newUser);
    }
  )
);

passport.use(
  "local",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
      var rows = await User.findOne({ email: email });
      if (rows) {
        return done(null, false, "That email is already taken.");
      } else {
        const newUser = await new User({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: email,
          password: password,
        }).save();
        return done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        var user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        user.comparePassword(password, (error, match) => {
          if (!match) {
            done(null, false, { message: "Incorrect password." });
          } else {
            return done(null, user);
          }
        });
      } catch (err) {
        console.log(err);
      }
      // await User.findOne({ email: email }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     console.log("Incorrect username.");
      //     return done(null, false, { message: "Incorrect username." });
      //   }
      //   if (
      //     !user.comparePassword(password, (error, match) => {
      //       if (!match) {
      //         console.log("Incorrect password.");
      //         done(null, false, { message: "Incorrect password." });
      //       }
      //     })
      //   )
      //     return done(null, user);
      // });
    }
  )
);
