const axios = require("axios");

const appliances = [
  "fridge",
  "ac",
  "washing-machine",
  "tv",
  "microwave",
  "heater",
  "smart-plug",
  "dishwasher",
  "fan",
  "lights",
];

// Generate random energy data
const generateRandomEnergyData = (deviceId) => ({
  deviceId,
  timestamp: new Date().toISOString(),
  powerUsage: (Math.random() * 500).toFixed(2), // Simulating power usage in Watts
});

// Function to send data for all devices
const sendData = async () => {
  for (const device of appliances) {
    const data = generateRandomEnergyData(device);
    try {
      const response = await axios.post("http://localhost:5000/api/energy", data);
      console.log(`Data sent for ${device}:`, response.data);
    } catch (error) {
      console.error(`Error sending data for ${device}:`, error.message);
    }
  }
};

// Send data every 5 seconds
setInterval(sendData, 5000);
