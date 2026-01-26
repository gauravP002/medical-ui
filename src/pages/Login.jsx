
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, Stethoscope, AlertCircle, UserCircle } from "lucide-react";
import { login } from "../services/authService";

// Mocking the validators and services as per original code structure
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mock login service to maintain logic flow

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle "Doctor Login" route specifically if navigated via link
  useEffect(() => {
    if (location.pathname === "/doctor-login") {
     // setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser || token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const setIsAdminCall = () => {
    setIsAdmin((prev) => !prev);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(form.email)) {
      return setError("Please enter a valid email");
    }

    setLoading(true);
    try {
      const res = await login(form, isAdmin);
      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.name,
          role: res.role,
        })
      );
      navigate("/dashboard");
      setError("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Branding & Toggle */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-teal-600 p-3 rounded-2xl shadow-xl shadow-teal-600/20 mb-6 transition-transform hover:scale-105">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isAdmin ? "Doctor Portal" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          {/* Subtle Decorative Gradient */}
          <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 -mr-12 -mt-12 transition-colors duration-500 ${isAdmin ? 'bg-blue-600' : 'bg-teal-600'}`}></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@hospital.com"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <Link to="#" className="text-xs font-semibold text-teal-600 hover:text-teal-700">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 text-white rounded-2xl font-bold text-lg focus:ring-4 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg ${isAdmin ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/20 shadow-blue-600/30' : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500/20 shadow-teal-600/30'}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Login {isAdmin ? 'as Doctor' : ''} <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
            <p className="text-center text-slate-500 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="font-bold text-teal-600 hover:text-teal-700 transition-colors">
                Register
              </Link>
            </p>
            <div className="flex flex-col items-center gap-3">
               <button 
                onClick={setIsAdminCall}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors group"
              >
                <UserCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Switch to {isAdmin ? 'Patient' : 'Doctor'} Login</span>
              </button>
              
              <div className="text-xs text-slate-400">
                Or visit the <Link to="/doctor-login" className="font-bold text-slate-700 hover:text-teal-600 underline underline-offset-4">Doctor Portal</Link> directly
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
