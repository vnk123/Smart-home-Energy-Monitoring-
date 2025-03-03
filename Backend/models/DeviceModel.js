const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    minPower: { type: Number, required: true },
    maxPower: { type: Number, required: true },
});

module.exports = mongoose.model("Device", DeviceSchema);
