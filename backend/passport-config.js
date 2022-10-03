require("dotenv").config();
const User = require("./models/user");
const bcrypt = require("bcryptjs");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5500/google/callback",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOne({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
        };
        cb(err, userInformation);
      });
    });
};
