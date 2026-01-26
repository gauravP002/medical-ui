
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAppointments } from "../services/appointmentService.jsx";
import { Calendar, User, Stethoscope, Clock, ChevronLeft, AlertCircle, Inbox, CheckCircle2, Timer, XCircle } from "lucide-react";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // In a real app, this would come from an auth context
  const userId = 11; 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getUserAppointments(userId);
        setAppointments(data || []);
      } catch (err) {
        setError(err.message || "Failed to load your medical history");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (s === 'cancelled' || s === 'rejected') return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-amber-50 text-amber-700 border-amber-100'; // pending/scheduled
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed') return <CheckCircle2 className="w-4 h-4" />;
    if (s === 'cancelled' || s === 'rejected') return <XCircle className="w-4 h-4" />;
    return <Timer className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors mb-4 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              My Appointments
            </h1>
            <p className="text-slate-500 font-medium">Manage and track your scheduled medical visits</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-bold">
              {appointments.length} Total
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 p-5 bg-rose-50 border border-rose-100 text-rose-600 rounded-[2rem]">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <div className="w-16 h-16 border-4 border-teal-600/20 border-t-teal-600 rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-bold text-slate-500">Syncing medical records...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
              <Inbox className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No Appointments Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed">
              You haven't scheduled any medical visits yet. Start by finding a specialist today.
            </p>
            <button 
              onClick={() => navigate("/addPaitent")}
              className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95"
            >
              Book New Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((a, index) => (
              <div 
                key={index} 
                className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-teal-600/5 transition-all group flex flex-col md:flex-row md:items-center gap-8"
              >
                {/* Visual Indicator */}
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">
                  <Calendar className="w-10 h-10" />
                </div>

                {/* Info Content */}
                <div className="flex-grow grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Details</span>
                    <div className="flex items-center gap-3 text-slate-900">
                      <User className="w-5 h-5 text-teal-600" />
                      <span className="text-lg font-bold tracking-tight">{a.patientName}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Healthcare Provider</span>
                    <div className="flex items-center gap-3 text-slate-900">
                      <Stethoscope className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-bold tracking-tight">{a.doctorName || "Assigned Specialist"}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Appointment Status</span>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border ${getStatusStyles(a.status)}`}>
                      {getStatusIcon(a.status)}
                      {a.status || "Scheduled"}
                    </div>
                  </div>
                </div>

                {/* Actions (Future implementation) */}
                <div className="md:border-l border-slate-100 md:pl-8 flex items-center">
                  <button 
                    className="w-full md:w-auto px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all"
                    onClick={() => alert('Viewing records for ' + a.patientName)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer Help */}
        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/20 blur-3xl"></div>
          <h4 className="text-xl font-bold mb-3 relative z-10">Need to reschedule?</h4>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto relative z-10">
            Contact our 24/7 patient support line for any changes to your scheduled visits.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
             <div className="flex items-center gap-2 text-teal-400 font-bold">
               <Clock className="w-4 h-4" />
               <span>Available 24/7</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
