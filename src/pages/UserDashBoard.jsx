
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/authService.jsx";
import UserListPage from "./UserListPage.jsx";
import DoctorList from "../components/DoctorList.jsx";
import { 
  Users, 
  UserPlus, 
  Stethoscope, 
  CalendarCheck, 
  LogOut, 
  PlusCircle, 
  Activity, 
  LayoutDashboard, 
  AlertCircle 
} from "lucide-react";

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
    setDOctorList((prev) => !prev);
  };

  const addPatients = () => {
    navigate("/addPaitent");
  };

  const loadAllAppoinment = () => {
    navigate("/appoinments");
  };

  const loadUser = async () => {
    try {
      const res = await getAllUsers("ADMIN");
      if (res && res.users?.length > 0) {
        setUsers([...res.users]);
      }
    } catch (err) {
      setError(err.message || "Failed to load users");
    }
  };

  const addDoctor = () => {
    navigate("/addDoctor");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {isDoctorList ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                Welcome, {user.name} <span className="animate-pulse">👋</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-700 uppercase tracking-wider">
                  {user.role}
                </span>
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <LayoutDashboard className="w-4 h-4" /> Medical Dashboard
                </span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 border border-red-100 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-sm active:scale-95 group"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Sign Out
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Management Controls</h3>
                
                <div className="grid gap-3">
                  {user.role === "ADMIN" ? (
                    <>
                      <button 
                        onClick={loadUser}
                        className="w-full flex items-center gap-4 p-4 text-slate-700 rounded-2xl hover:bg-teal-50 hover:text-teal-700 transition-all border border-transparent hover:border-teal-100 group"
                      >
                        <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="font-bold">All Users</span>
                      </button>

                      <button 
                        onClick={addDoctor}
                        className="w-full flex items-center gap-4 p-4 text-slate-700 rounded-2xl hover:bg-blue-50 hover:text-blue-700 transition-all border border-transparent hover:border-blue-100 group"
                      >
                         <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Add New Doctor</span>
                      </button>

                      <button 
                        onClick={loadDoctors}
                        className="w-full flex items-center gap-4 p-4 text-slate-700 rounded-2xl hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-transparent hover:border-indigo-100 group"
                      >
                         <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Doctor Management</span>
                      </button>
                    </>
                  ) : null}

                  {user.role === "USER" ? (
                    <>
                      <button 
                        onClick={loadAllAppoinment}
                        className="w-full flex items-center gap-4 p-4 text-slate-700 rounded-2xl hover:bg-teal-50 hover:text-teal-700 transition-all border border-transparent hover:border-teal-100 group"
                      >
                        <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <CalendarCheck className="w-5 h-5" />
                        </div>
                        <span className="font-bold">My Appointments</span>
                      </button>

                      <button 
                        onClick={addPatients}
                        className="w-full flex items-center gap-4 p-4 text-slate-700 rounded-2xl hover:bg-blue-50 hover:text-blue-700 transition-all border border-transparent hover:border-blue-100 group"
                      >
                        <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <PlusCircle className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Register Patient</span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-[2rem] text-white shadow-lg shadow-teal-600/20">
                <Activity className="w-10 h-10 mb-4 opacity-80" />
                <h4 className="text-xl font-bold mb-2">Health Monitor</h4>
                <p className="text-teal-50 text-sm leading-relaxed">
                  Your system is secure and all services are currently online.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px]">
                {error && (
                  <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {allUsers.length > 0 ? "User Directory" : "Activity Feed"}
                  </h3>
                  {allUsers.length > 0 && (
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
                      {allUsers.length} total entries
                    </span>
                  )}
                </div>

                {allUsers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6">
                      <LayoutDashboard className="w-12 h-12" />
                    </div>
                    <div className="max-w-xs mx-auto">
                      <p className="text-slate-400 font-medium">
                        No active list items to display. Use the sidebar controls to load information.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ul className="grid gap-4">
                    {allUsers.map((u) => (
                      <li key={u.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <UserListPage user={u} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DoctorList reloadKey={0} isDOctorView={loadDoctors} />
      )}
    </div>
  );
}
