require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel"); // make sure to import your User model

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://clean-with-care.onrender.com/auth/google/callback", 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.emails[0].value, // using email as username
          });
          console.log("New Google user created:", user);
        } else {
          console.log("Existing Google user found:", user);
        }

        return done(null, user);
      } catch (err) {
        console.error("Error during Google authentication", err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into session (optional, if you use sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
