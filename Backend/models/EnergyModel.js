const mongoose = require("mongoose");

const EnergySchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    device: { type: String, required: true },
    powerUsage: { type: Number, required: true },
});

module.exports = mongoose.model("Energy", EnergySchema);
