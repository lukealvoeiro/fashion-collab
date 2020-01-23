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
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
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
        email: profile._json.email
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
      profileFields: ["id", "emails", "name"]
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await new User({
        facebookId: profile._json.id,
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        email: profile._json.email
      }).save();
      done(null, newUser);
    }
  )
);

// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     {
//       // by default, local strategy uses username and password, we will override with email
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true // allows us to pass back the entire request to the callback
//     },
//     async (req, email, password, done) => {
//       var rows = await knex("Users").where({ email: email });
//       if (rows.length) {
//         return done(
//           null,
//           false,
//           req.flash("signupMessage", "That email is already taken.")
//         );
//       } else {
//         newUser = {
//           email: _json.email,
//           firstName: _json.first_name,
//           lastName: _json.last_name,
//           facebookId: _json.id
//         };
//         resInsert = await knex("Users").insert(newUser);
//         newUser.idUser = resInsert[0];
//         return done(null, newUser);
//       }
//     }
//   )
// );
