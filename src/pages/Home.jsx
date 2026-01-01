import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-card">
        <h1>Medical Appointment System</h1>
        <p>
          Book appointments, manage profiles, and access medical services
          securely — all in one place.
        </p>

        <div className="home-actions">
          <Link to="/login" className="home-btn primary">
            Login
          </Link>
          <Link to="/register" className="home-btn secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
