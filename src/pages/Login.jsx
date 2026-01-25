import { useState } from "react";
import { emailRegex, passwordRegex } from "../utils/validators";
import { login } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
   const navigate = useNavigate();
   const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
       const storedUser = localStorage.getItem("user");
       const token = localStorage.getItem("token");
   
       if (storedUser || token) {
         navigate("/dashboard");
       } 
     }, [navigate]);

     const setIsAdminCall = () =>{
      setIsAdmin((isAdminLogin) => !isAdminLogin);
     }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(form.email)) {
      return setError("Please enter a valid email");
    }

    // if (!passwordRegex.test(form.password)) {
    //   return setError("Password must be at least 6 characters");
    // }

    try {
      const res = await login(form, isAdmin);
      console.log("Login success:", res);
       localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.name,
          role: res.role,
        })
      );
      navigate("/dashboard")
      setError("");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
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

       <button type="submit">Login</button>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
        <div className="auth-footer">
         Login As Doctor <Link to="/doctor-login">Doctor Login</Link>
        </div>
      </form>
    </div>
  );
}
