const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const { Elderly } = require("../model/elderly");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let elderly = await Elderly.findOne({ googleId: profile.id });
        if (!elderly) {
          elderly = new Elderly({
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            verified: true,
          });
          await elderly.save();
        }
        done(null, elderly);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: '/auth/facebook/callback',
//   profileFields: ['id', 'emails', 'name']
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let elderly = await Elderly.findOne({ facebookId: profile.id });
//     if (!elderly) {
//       elderly = new Elderly({
//         facebookId: profile.id,
//         firstname: profile.name.givenName,
//         lastname: profile.name.familyName,
//         email: profile.emails[0].value,
//         verified: true
//       });
//       await elderly.save();
//     }
//     done(null, elderly);
//   } catch (err) {
//     done(err, null);
//   }
// }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Elderly.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
