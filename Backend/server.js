const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database configuration
const db = require("./config/db"); // Importing db.js

const energyRoutes = require("./routes/energyRoutes"); // Import energy routes

const app = express();
app.use(cors());
app.use(express.json()); // Ensure JSON data is parsed

// Test the MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.log("Error connecting to the database:", err);
        process.exit(1); // Exit if there is an error with DB connection
    } else {
        console.log("Connected to MySQL database");
        connection.release(); // Release the connection after checking
    }
});

app.use("/api/energy", energyRoutes); // ✅ Register energy routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
