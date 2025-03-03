const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        res.json({ message: "User authenticated", user: payload });
    } catch (error) {
        res.status(400).json({ message: "Authentication failed", error });
    }
});

module.exports = router;
