import { useState, useEffect } from "react";
import { createAppointment } from "../services/appointmentService";
import "../styles/appointment.css";

export default function CreateAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorId: "",
    userId: 11 // later from login
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  // ================= LOAD DOCTORS =================
  const loadDoctors = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/doctor/getAllDoctors",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "ADMIN" })
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load doctors");
      }

      const data = await res.json();

      // ✅ FIXED HERE
      setDoctors(data.doctor || []);
      setError("");
    } catch (err) {
      setError(err.message);
      setDoctors([]);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // ================= FORM HANDLING =================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctorId) {
      alert("Please select a doctor");
      return;
    }

    try {
      const message = await createAppointment(form);
      alert(message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="appointment-page">
      <form className="appointment-card" onSubmit={handleSubmit}>
        <h2>Create Appointment</h2>

        <input
          name="patientName"
          placeholder="Patient Name"
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* ✅ DOCTOR DROPDOWN */}
        <select name="doctorId" onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} — {doc.speciality}
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button>Create</button>
      </form>
    </div>
  );
}
