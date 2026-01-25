// ...existing code...
import { useState } from "react";
import "../styles/doctor.css";
import { Link } from "react-router-dom";
import DoctorList from "../components/DoctorList";

export default function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    qualification: "",
    contact: ""
  });

  const [message, setMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/doctor/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const text = await res.text();

      if (!res.ok) {
        setMessage(text || "Failed to add doctor");
      } else {
        setMessage(text || "Doctor added");
        // trigger DoctorList to reload
        setReloadKey((k) => k + 1);
        // clear form if desired
        setForm({
          name: "",
          email: "",
          password: "",
          speciality: "",
          qualification: "",
          contact: ""
        });
      }
    } catch (err) {
      setMessage(err.message || "Request failed");
    }
  };

  return (
   
    <div className="doctor-page">
        
      <form className="doctor-card" onSubmit={handleSubmit}>
        <h2>Add Doctor</h2>

        <input name="name" placeholder="Doctor Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="speciality" placeholder="Speciality" value={form.speciality} onChange={handleChange} />
        <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />

        <button>Add Doctor</button>

        {message && (
          <div className="doctor-message success">{message}</div>
        )}
        <div className="auth-footer">
          Move to Dashboard <Link to="/dashboard">Doctor DashBoard</Link>
        </div>
      </form>

    
    </div>
  );
}
// ...existing code...