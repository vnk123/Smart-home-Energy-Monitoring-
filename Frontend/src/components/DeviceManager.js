import React, { useState, useEffect } from "react";

const DeviceManager = () => {
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [powerUsage, setPowerUsage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/devices")
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(err => console.error("Error fetching devices:", err));
    }, []);

    const addDevice = () => {
        const newDevice = { name: deviceName, power: powerUsage };
        fetch("http://localhost:5000/api/devices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDevice),
        })
            .then(res => res.json())
            .then(data => setDevices([...devices, data]))
            .catch(err => console.error("Error adding device:", err));

        setDeviceName("");
        setPowerUsage("");
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Manage Virtual Devices</h2>
            <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Power Usage (W)"
                value={powerUsage}
                onChange={(e) => setPowerUsage(e.target.value)}
            />
            <button onClick={addDevice}>Add Device</button>

            <h3>Device List</h3>
            <ul>
                {devices.map((device, index) => (
                    <li key={index}>{device.name} - {device.power}W</li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceManager;
