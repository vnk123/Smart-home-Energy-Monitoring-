import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./components/Dashboard";
import DeviceManager from "./components/DeviceManager";
import RoomChart from "./components/RoomChart"; // Import Room Chart
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AppBar position="static">
                        <Toolbar className="flex justify-between">
                            <Typography variant="h6">Energy Monitor</Typography>
                            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <div>
                                {/* Removed Sign In and Sign Out buttons */}
                                <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                                <Button component={Link} to="/devices" color="inherit">Devices</Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/devices" element={<DeviceManager />} />
                        <Route path="/room/:roomName" element={<RoomChart />} /> {/* Dynamic Room Route */}
                    </Routes>
                </Router>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
};

export default App;
