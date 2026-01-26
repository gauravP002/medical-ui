import { useEffect, useState } from "react";
import { getUserAppointments } from "../services/appointmentService";
import "../styles/userAppointments.css";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const userId = 11; // later from auth

  useEffect(() => {
    getUserAppointments(userId)
      .then(setAppointments)
      .catch(err => alert(err.message));
  }, []);

  return (
    <div className="user-appointments-page">
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="no-appointments">
          No appointments found
        </div>
      ) : (
        <div className="appointment-grid">
          {appointments.map((a, index) => (
            <div className="appointment-card" key={index}>
              <p><strong>Patient:</strong> {a.patientName}</p>
              <p><strong>Doctor:</strong> {a.doctorName}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${a.status}`}>
                  {a.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
