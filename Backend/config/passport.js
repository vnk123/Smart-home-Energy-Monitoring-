const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Load environment variables from .env (optional, if using dotenv)
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
            callbackURL: '/api/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // Here, you should find or create a user in the database
            const user = { id: profile.id, email: profile.emails[0].value };
            return done(null, user);
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
