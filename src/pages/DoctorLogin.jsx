import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/doctor.css";

export default function DoctorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/doctor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
       localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          role: data.role,
        })
      );
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="doctor-page">
      <form className="doctor-card" onSubmit={handleSubmit}>
        <h2>Doctor Login</h2>

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button>Login</button>

        {error && (
          <div className="doctor-message error">{error}</div>
        )}
      </form>
    </div>
  );
}
