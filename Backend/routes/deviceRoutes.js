const express = require("express");
const DeviceModel = require("../models/DeviceModel");

const router = express.Router();

// Get All Virtual Devices
router.get("/", async (req, res) => {
    try {
        const devices = await DeviceModel.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching devices", error });
    }
});

// Add a Virtual Device
router.post("/", async (req, res) => {
    try {
        const { name, minPower, maxPower } = req.body;
        const newDevice = new DeviceModel({ name, minPower, maxPower });
        await newDevice.save();
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).json({ message: "Error adding device", error });
    }
});

module.exports = router;
