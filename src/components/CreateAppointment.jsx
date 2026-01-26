
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../services/appointmentService.jsx";
import { User, Calendar, Stethoscope, ChevronLeft, Loader2, AlertCircle, HeartPulse, Sparkles } from "lucide-react";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctorId: "",
    userId: 11 // This would ideally come from your auth context/localStorage
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // If you want to link the appointment to the actual logged in user
      // setForm(prev => ({ ...prev, userId: parsed.id || 11 }));
    }
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8080/api/doctor/getAllDoctors",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify("ADMIN") // Payload as per your previous logic
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load doctors");
      }

      const data = await res.json();
      setDoctors(data.doctor || []);
      setError("");
    } catch (err) {
      setError(err.message);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctorId) {
      setError("Please select a medical specialist");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const message = await createAppointment(form);
      alert("Success: " + message);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Navigation Back */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-teal-50">
            <ChevronLeft className="w-5 h-5" />
          </div>
          Back to Dashboard
        </button>

        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 blur-3xl opacity-50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 blur-3xl opacity-50 -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
                <Calendar className="w-9 h-9" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Book Appointment</h2>
                <p className="text-slate-500 font-medium">Schedule your visit with our specialists</p>
              </div>
            </div>

            {error && (
              <div className="mb-8 flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Patient Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input
                      name="patientName"
                      placeholder="e.g. Alice Smith"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Patient Age</label>
                  <div className="relative group">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input
                      name="age"
                      type="number"
                      placeholder="e.g. 28"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Gender</label>
                  <div className="relative">
                    <HeartPulse className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      name="gender" 
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none appearance-none transition-all"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Select Specialist</label>
                  <div className="relative">
                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      name="doctorId" 
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none appearance-none transition-all disabled:opacity-50"
                      disabled={loading}
                      required
                    >
                      <option value="">{loading ? "Loading doctors..." : "Choose a Doctor"}</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.speciality}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-bold text-lg hover:bg-teal-700 active:scale-95 transition-all shadow-xl shadow-teal-600/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
              >
                {submitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>Complete Booking <Sparkles className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
