// ...new file...
import { useEffect, useState } from "react";
import "../styles/doctor.css";

export default function DoctorEditForm({ doctor, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    speciality: "",
    qualification: "",
    contact: "",
  });

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name ?? "",
        email: doctor.email ?? "",
        speciality: doctor.speciality ?? "",
        qualification: doctor.qualification ?? "",
        contact: doctor.contact ?? "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // do not send password here by default. Include if API supports.
    onSave(doctor.id ?? doctor.email, form);
  };

  return (
    <form className="doctor-edit-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        Speciality
        <input name="speciality" value={form.speciality} onChange={handleChange} />
      </label>
      <label>
        Qualification
        <input name="qualification" value={form.qualification} onChange={handleChange} />
      </label>
      <label>
        Contact
        <input name="contact" value={form.contact} onChange={handleChange} />
      </label>

      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} disabled={saving} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
// ...new file...