import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

// Simulated data for energy consumption per room
const generateRoomData = () => {
    const rooms = ["Living Room", "Kitchen", "Bedroom", "Office"];
    return rooms.map(room => ({
        room: room,
        consumption: Math.random() * 500 // Random energy consumption between 0 and 500 W
    }));
};

const UNIT_COST = 5; // Cost per kWh

// Function to calculate bill based on energy consumed (in kWh)
const calculateBill = (totalConsumption) => {
    const kWh = totalConsumption / 1000; // Convert W to kWh
    return kWh * UNIT_COST;
};

const EnergyChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Energy Consumption per Room (W)",
                data: [],
                backgroundColor: ["#FF6347", "#4682B4", "#32CD32", "#FFD700"], // Different colors for each room
                borderColor: ["#FF4500", "#1E90FF", "#228B22", "#FFD700"],
                borderWidth: 1,
            }
        ]
    });
    const [totalConsumption, setTotalConsumption] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [cumulativeBill, setCumulativeBill] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate data for rooms
                const roomData = generateRoomData();

                // Calculate the total consumption (sum of all rooms)
                const totalConsumption = roomData.reduce((sum, room) => sum + room.consumption, 0);
                setTotalConsumption(totalConsumption);

                // Update chart data
                setChartData((prev) => ({
                    labels: roomData.map(room => room.room),
                    datasets: [
                        {
                            label: "Energy Consumption per Room (W)",
                            data: roomData.map(room => room.consumption),
                            backgroundColor: ["#FF6347", "#4682B4", "#32CD32", "#FFD700"], // Different colors for each room
                            borderColor: ["#FF4500", "#1E90FF", "#228B22", "#FFD700"],
                            borderWidth: 1,
                        }
                    ]
                }));

                // Calculate the cumulative bill
                const bill = calculateBill(totalConsumption);
                setCumulativeBill(bill);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(() => {
            fetchData();
            setCurrentTime(new Date().toLocaleTimeString());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "80%", margin: "auto", padding: "20px", background: "#1e1e1e", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center", color: "white" }}>Energy Consumption by Room</h2>
            
            <p style={{ textAlign: "center", color: "yellow", fontSize: "16px" }}>
                ⏰ <strong>Last Update:</strong> {currentTime}
            </p>

            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    animation: { duration: 500, easing: "easeInOutQuad" },
                    scales: {
                        x: { 
                            ticks: { color: "white" },
                            title: { display: true, text: "Rooms", color: "white" }
                        },
                        y: {
                            ticks: { color: "white" },
                            title: { display: true, text: "Energy Consumption (W)", color: "white" },
                            beginAtZero: true,
                            stepSize: 100, // Set step size to 100W
                        }
                    },
                    plugins: {
                        legend: { labels: { color: "white" } }
                    }
                }}
            />

            <h3 style={{ textAlign: "center", color: "cyan", marginTop: "20px" }}>
                ⚡ Total Consumption: <strong>{(totalConsumption / 1000).toFixed(2)} kWh</strong> {/* Convert to kWh */}
            </h3>
            <h3 style={{ textAlign: "center", color: "lightgreen" }}>
                💰 Cumulative Bill: <strong>₹{cumulativeBill.toFixed(2)}</strong>
            </h3>
        </div>
    );
};

export default EnergyChart;
