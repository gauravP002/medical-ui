
import React, { useEffect, useState } from "react";
import { header } from "../utils/validators.jsx";
import DoctorEditForm from "./DoctorEditForm.jsx";
import { Stethoscope, Mail, Phone, GraduationCap, Edit3, ArrowLeft, Loader2, UserCircle, RefreshCcw, AlertCircle } from "lucide-react";

export default function DoctorList({ reloadKey, isDOctorView }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const payload = "ADMIN";
      const res = await fetch("http://localhost:8080/api/doctor/getAllDoctors", {
        method: "POST",
        headers: header,
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      const data = await res.json();
      setDoctors(data.doctor ?? []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load doctors");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [reloadKey]);

  const openEdit = (doc) => setEditingDoctor(doc);
  const closeEdit = () => setEditingDoctor(null);

  const handleSave = async (id, updatedFields) => {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:8080/api/doctor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const updated = (await res.json()) || { id, ...updatedFields };
      setDoctors((prev) => prev.map((d) => (d.id === id || d.email === updated.email ? updated : d)));
      setError("");
      closeEdit();
    } catch (err) {
      setError(err.message || "Failed to update practitioner");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <button 
            onClick={isDOctorView}
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-teal-600 shadow-sm transition-all hover:bg-teal-50 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Staff Registry</h3>
            <p className="text-slate-500 font-medium">Managing healthcare professionals and credentials</p>
          </div>
        </div>
        
        <button 
          onClick={loadDoctors}
          className="flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-700 rounded-2xl font-bold hover:bg-teal-100 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
          Refresh List
        </button>
      </div>

      {error && (
        <div className="mb-10 p-5 bg-rose-50 border border-rose-100 text-rose-600 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <div className="w-16 h-16 border-4 border-teal-600/20 border-t-teal-600 rounded-full animate-spin mb-6"></div>
          <p className="text-lg font-bold text-slate-500 tracking-tight">Accessing encrypted medical registry...</p>
        </div>
      )}

      {!loading && doctors.length === 0 && !error && (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Stethoscope className="w-10 h-10" />
          </div>
          <p className="text-slate-400 font-bold text-lg">No practitioners found in the system registry.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((d) => (
          <div key={d.id ?? d.email} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-600/10 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 blur-3xl opacity-50 -mr-16 -mt-16 group-hover:bg-teal-100 transition-all"></div>
            
            <div className="relative z-10 flex-grow">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <button 
                  onClick={() => openEdit(d)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{d.name}</h4>
                  <div className="inline-flex mt-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-teal-100">
                    {d.speciality ?? "General Specialist"}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-slate-500">
                    <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="text-sm font-medium truncate">{d.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm font-medium">{d.qualification ?? "Medical Doctorate"}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium">{d.contact ?? "Contact not set"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Footer */}
      <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col items-center gap-6">
        <p className="text-slate-400 text-sm font-medium">Ready to return to the administrative controls?</p>
        <button 
          onClick={isDOctorView}
          className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-teal-600 transition-all flex items-center gap-3 shadow-xl hover:shadow-teal-600/20 active:scale-95"
        >
          <UserCircle className="w-6 h-6" /> Back to Admin Dashboard
        </button>
      </div>

      {/* Edit Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={closeEdit}></div>
          <div className="relative w-full max-w-lg bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900">
                 <Edit3 className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="text-2xl font-extrabold text-slate-900">Edit Practitioner</h4>
                 <p className="text-slate-500 text-sm font-medium italic">Updating records for {editingDoctor.name}</p>
               </div>
            </div>
            
            <DoctorEditForm
              doctor={editingDoctor}
              onSave={handleSave}
              onCancel={closeEdit}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
