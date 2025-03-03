const express = require("express");
const router = express.Router();
const db = require("../config/db");  // Corrected path to db.js

// Example of a route to get energy data
router.get("/data", (req, res) => {
    db.query("SELECT * FROM energy_data", (err, results) => {
        if (err) {
            console.error("Error fetching energy data", err);
            return res.status(500).json({ message: "Server Error" });
        }
        res.json(results); // Send the results as JSON
    });
});

// Example of a route to add energy data
router.post("/data", (req, res) => {
    const { timestamp, energy_consumed } = req.body;
    
    // Ensure the required data is provided
    if (!timestamp || !energy_consumed) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const query = "INSERT INTO energy_data (timestamp, energy_consumed) VALUES (?, ?)";
    
    db.query(query, [timestamp, energy_consumed], (err, result) => {
        if (err) {
            console.error("Error inserting energy data", err);
            return res.status(500).json({ message: "Server Error" });
        }
        res.status(201).json({ message: "Data added successfully", data: result });
    });
});

// Other routes for updating and deleting energy data can go here

module.exports = router;
