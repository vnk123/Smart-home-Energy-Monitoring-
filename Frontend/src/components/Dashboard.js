import React from "react";
import { Link } from "react-router-dom";
import EnergyChart from "./EnergyChart";

const rooms = ["Living Room", "Kitchen", "Bedroom", "Office"];

const Dashboard = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Dashboard</h1>
            <p>View your energy consumption data below.</p>

            {/* Room Buttons with Bold Text */}
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
                {rooms.map(room => (
                    <Link key={room} to={`/room/${room.replace(/\s+/g, "").toLowerCase()}`} style={{ textDecoration: "none" }}>
                        <button style={{
                            padding: "10px", fontSize: "16px", fontWeight: "bold", cursor: "pointer",
                            backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px"
                        }}>
                            {room}
                        </button>
                    </Link>
                ))}
            </div>

            {/* Energy Consumption Overview */}
            <EnergyChart />

            {/* Manage Devices Button */}
            <br />
            <Link to="/devices">
                <button style={{
                    padding: "10px", fontSize: "16px", cursor: "pointer",
                    backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px"
                }}>
                    Manage Devices
                </button>
            </Link>
        </div>
    );
};

export default Dashboard;
