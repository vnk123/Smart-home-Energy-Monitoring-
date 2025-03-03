import { useEffect, useState } from "react";

const Auth = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Auth;
