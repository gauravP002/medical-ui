// ...existing code...
import { useEffect, useState } from "react";
import "../styles/doctor.css";
import DoctorEditForm from "./DoctorEditForm";
import { header } from "../utils/validators";
import '../styles/doctorlist.css';
import { Link } from "react-router-dom";

export default function DoctorList({ reloadKey, isDOctorView }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const payload = "ADMIN"
      const res = await fetch("http://localhost:8080/api/doctor/getAllDoctors", {
          method: "POST",
          headers:header,
          body: JSON.stringify(payload)
        });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      const data = await res.json();
      setDoctors(data.doctor ?? data.doctor);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load doctors");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [reloadKey]);

  const openEdit = (doc) => setEditingDoctor(doc);
  const closeEdit = () => setEditingDoctor(null);

  // Update doctor on server and update local list
  const handleSave = async (id, updatedFields) => {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:8080/api/doctor/${id}`, {
        method: "PUT", // adjust to PATCH if your API expects
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      // prefer server response; fall back to merging local
      const updated = (await res.json()) || { id, ...updatedFields };

      setDoctors((prev) => prev.map((d) => (d.id === id || d.email === updated.email ? updated : d)));
      setError("");
      closeEdit();
    } catch (err) {
      setError(err.message || "Failed to update doctor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="doctor-list">
      <h3>Doctors</h3>

      {error && <div className="doctor-message error">{error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && doctors.length === 0 && !error && <div>No doctors found.</div>}
  
      <ul>
        {doctors.map((d) => (
          <li key={d.id ?? d.email} className="doctor-item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{d.name}</strong> — {d.email}
                <div>Speciality: {d.speciality ?? "—"}</div>
                <div>Qualification: {d.qualification ?? "—"}</div>
                <div>Contact: {d.contact ?? "—"}</div>
              </div>
              <div>
                <button onClick={() => openEdit(d)}>Edit</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

       <div>
         Login As Doctor <a onClick={loadDoctors}>Move To dashboard</a>
        </div>
    

      {editingDoctor && (
        <div className="doctor-edit-modal">
          <div className="doctor-edit-card">
            <h4>Edit Doctor</h4>
            <DoctorEditForm
              doctor={editingDoctor}
              onSave={(updatedFields) => handleSave(editingDoctor.id ?? editingDoctor.email, updatedFields)}
              onCancel={closeEdit}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
// ...existing code...