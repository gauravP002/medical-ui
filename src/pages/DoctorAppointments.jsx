import { useEffect, useState } from "react";
import { getDoctorAppointments } from "../services/appointmentService";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = 1; // later from auth

  useEffect(() => {
    getDoctorAppointments(doctorId)
      .then(setAppointments)
      .catch(err => alert(err.message));
  }, []);

  return (
    <div>
      <h2>My Patients</h2>

      {appointments.map((a, index) => (
        <div key={index}>
          <p>Patient: {a.patientName}</p>
          <p>Age: {a.age}</p>
          <p>Gender: {a.gender}</p>
          <p>Status: {a.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
