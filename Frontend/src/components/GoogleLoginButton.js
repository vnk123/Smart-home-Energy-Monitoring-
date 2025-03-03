import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        localStorage.setItem("user", JSON.stringify(decoded));
        navigate("/dashboard");
    };

    const handleFailure = () => {
        console.error("Google login failed.");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Energy Monitor</h1>
            <p>Please sign in with Google to continue.</p>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </div>
    );
};

export default GoogleLoginButton;
