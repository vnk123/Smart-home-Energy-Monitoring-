const mongoose = require("mongoose");

const energySchema = new mongoose.Schema({
    usage: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Energy", energySchema);
