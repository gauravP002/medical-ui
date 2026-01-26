import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/authService";
import "../styles/dashboard.css";
import UserListPage from "./UserListPage";
import DoctorList from "../components/DoctorList";

export default function UserDashBoard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [allUsers, setUsers] = useState([]);
  const [isDoctorList, setDOctorList] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const loadDoctors = () => {
    setDOctorList((setDOctorListview) => !setDOctorList);
  };

  const addPatients = () =>{
     navigate("/addPaitent");

  }

  const loadAllAppoinment = () =>{
    navigate("/appoinments")

  }

  const loadUser = async () => {
    try {
      const res = await getAllUsers("ADMIN");
      console.log(res);
      if (res && res.users?.length > 0) {
        setUsers((users) => [...res.users]);
      }
    } catch (err) {
      setError(err.message || "Failed to load");
    }
  };
  const addDoctor = () => {
    navigate("/addDoctor");
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
        {isDoctorList ?
      <div className="dashboard-card">
        <h2>Welcome, {user.name} 👋</h2>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <button onClick={logout}>Logout</button>

        {user.role === "ADMIN" ? (
          <div>
            <button onClick={loadUser}>All User</button>
            <button onClick={addDoctor}>Add Doctor</button>
            <button onClick={loadDoctors}>All Doctors</button>
          </div>
        ) : null}

        {
          user.role === "USER" ? (<div>
            <button onClick={loadAllAppoinment}>All appoinment</button>
            <button onClick={addPatients}>Add Patients</button>
          </div>) : null
        }

        {error && <p className="error">{error}</p>}

        <ul>
          {allUsers.map((u) => (
            <li key={u.id}>
              <UserListPage user={u} />
            </li>
          ))}
        </ul>
      </div>  : <DoctorList reloadKey={0} isDOctorView={loadDoctors}/>}
    </div>
  );
}
