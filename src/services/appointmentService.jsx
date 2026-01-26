const BASE_URL = "http://localhost:8080/api/appointment";

// ================= CREATE APPOINTMENT =================
export async function createAppointment(data) {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }

  return response.text();
}

// ================= USER APPOINTMENTS =================
export async function getUserAppointments(userId) {
  const response = await fetch(`${BASE_URL}/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to load user appointments");
  }

  return response.json();
}

// ================= DOCTOR APPOINTMENTS =================
export async function getDoctorAppointments(doctorId) {
  const response = await fetch(`${BASE_URL}/doctor/${doctorId}`);

  if (!response.ok) {
    throw new Error("Failed to load doctor appointments");
  }

  return response.json();
}
