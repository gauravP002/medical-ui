import { header } from "../utils/validators";

const BASE_URL = "http://localhost:8080/api/auth";

export async function login(data, isAdmin) {
  if(isAdmin) {
    data['role'] = 'admin';
  }
  else {
    data['role'] = 'user'
  }
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers:header,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}

export async function register(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers:header,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}

export async function getAllUsers(data) {
  const res = await fetch(`${BASE_URL}/getUsers`, {
     method: "POST",
    headers:header,
    body: JSON.stringify(data)
  });

 if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
   return res.json();
  
}
