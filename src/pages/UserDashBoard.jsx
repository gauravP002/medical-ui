import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/authService";
import "../styles/dashboard.css";

export default function UserDashBoard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const loadUser = async () => {
    try {
      const res = await getAllUsers("ADMIN");
      console.log(res);
    } catch (err) {
      setError(err.message || "Failed to load");
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h2>Welcome, {user.name} 👋</h2>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <button onClick={logout}>Logout</button>
        <button onClick={loadUser}>All User</button>
      </div>
    </div>
  );
}
