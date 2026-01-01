import { useState } from "react";
import { emailRegex, passwordRegex } from "../utils/validators";
import { register } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) return setError("Name is required");
    if (!emailRegex.test(form.email)) return setError("Invalid email");
    // if (!passwordRegex.test(form.password))
    //   return setError("Password must be at least 6 characters");

    try {
      const res = await register(form);
      console.log("Register success:", res);
      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.name,
          role: res.role,
        })
      );

      setError("");
     navigate("/dashboard");
      setError("");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
