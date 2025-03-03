const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   GET /api/auth/google
// @desc    Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google auth callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => {
        // Generate JWT token for the user
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        // Redirect with token
        res.redirect(`/dashboard?token=${token}`);
    }
);

// @route   GET /api/auth/logout
// @desc    Logout user
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
