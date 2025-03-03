import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

// Function to generate random data for simulation
const generateRandomData = (count, maxValue) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * maxValue));
};

const RoomChart = () => {
    const { roomName } = useParams();
    const [timeLabels, setTimeLabels] = useState([]);
    const [powerData, setPowerData] = useState([]);
    const [hourlyConsumption, setHourlyConsumption] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Generate mock time labels and energy data
            const now = new Date();
            const labels = Array.from({ length: 10 }, (_, i) => {
                let time = new Date(now.getTime() - i * 60000).toLocaleTimeString();
                return time;
            }).reverse();

            setTimeLabels(labels);
            setPowerData(generateRandomData(10, 500)); // Power usage (Watts)
            setHourlyConsumption(generateRandomData(12, 40)); // Hourly kWh
        }, 5000); // Update every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    return (
        <div style={{ width: "80%", margin: "auto", padding: "20px", background: "#1e1e1e", borderRadius: "10px" }}>
            <h2 style={{ textAlign: "center", color: "white" }}>{roomName} Energy Consumption</h2>

            {/* Energy Trend Line Chart */}
            <div style={{ background: "#333", padding: "20px", borderRadius: "10px" }}>
                <h3 style={{ color: "cyan" }}>Energy Trend</h3>
                <Line
                    data={{
                        labels: timeLabels,
                        datasets: [
                            {
                                label: "Power Usage (W)",
                                data: powerData,
                                borderColor: "cyan",
                                backgroundColor: "rgba(0, 255, 255, 0.2)",
                                borderWidth: 2,
                                tension: 0.4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        scales: {
                            x: { ticks: { color: "white" } },
                            y: { ticks: { color: "white" } },
                        },
                    }}
                />
            </div>

            {/* Hourly Consumption Bar Chart */}
            <div style={{ background: "#333", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
                <h3 style={{ color: "lightgreen" }}>Hourly Consumption (kWh)</h3>
                <Bar
                    data={{
                        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}:00`),
                        datasets: [
                            {
                                label: "Consumption (kWh)",
                                data: hourlyConsumption,
                                backgroundColor: "orange",
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        scales: {
                            x: { ticks: { color: "white" } },
                            y: { ticks: { color: "white" } },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default RoomChart;
