
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  Stethoscope, 
  GraduationCap, 
  Phone, 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function AddDoctor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    qualification: "",
    contact: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/doctor/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const text = await res.text();

      if (!res.ok) {
        setIsError(true);
        setMessage(text || "Failed to add doctor to the registry");
      } else {
        setIsError(false);
        setMessage(text || "Practitioner successfully registered");
        setForm({
          name: "",
          email: "",
          password: "",
          speciality: "",
          qualification: "",
          contact: ""
        });
        // Optional: navigate after success
        // setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Network request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Navigation */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-teal-50 transition-colors">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Dashboard
        </button>

        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 blur-3xl opacity-60 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 blur-3xl opacity-60 -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
              <div className="w-20 h-20 bg-teal-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-teal-600/30">
                <UserPlus className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Add Practitioner</h2>
                <p className="text-slate-500 font-medium">Register a new healthcare professional to the system</p>
              </div>
            </div>

            {message && (
              <div className={`mb-8 flex items-center gap-4 p-5 rounded-[2rem] border animate-in fade-in slide-in-from-top-4 duration-500 ${
                isError ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
              }`}>
                {isError ? <AlertCircle className="w-6 h-6 shrink-0" /> : <CheckCircle2 className="w-6 h-6 shrink-0" />}
                <p className="font-bold">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      placeholder="Dr. Julian Bashir"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      type="email"
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder="julian@medsync.care"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Portal Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      type="password"
                      name="password" 
                      value={form.password} 
                      onChange={handleChange} 
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      name="contact" 
                      value={form.contact} 
                      onChange={handleChange} 
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Speciality */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Medical Speciality</label>
                  <div className="relative group">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      name="speciality" 
                      value={form.speciality} 
                      onChange={handleChange} 
                      placeholder="Cardiology / Neurology"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Highest Qualification</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    <input 
                      name="qualification" 
                      value={form.qualification} 
                      onChange={handleChange} 
                      placeholder="MD, PhD in Medical Science"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-bold text-lg hover:bg-teal-700 active:scale-95 transition-all shadow-2xl shadow-teal-600/20 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Register Practitioner <Sparkles className="w-5 h-5" /></>}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
               <p className="text-slate-400 text-sm font-medium italic">All credentials will be securely encrypted.</p>
               <Link to="/dashboard" className="text-teal-600 font-bold hover:text-teal-700 underline underline-offset-8 decoration-teal-600/30">
                 Return to Admin View
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
