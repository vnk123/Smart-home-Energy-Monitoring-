const mysql = require("mysql2");

// Create the connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "venkatesh",
    database: process.env.DB_NAME || "energy_monitor",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool so it can be used in other files
module.exports = db;
