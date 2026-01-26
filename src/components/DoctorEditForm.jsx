
import React, { useEffect, useState } from "react";
import { User, Mail, Stethoscope, GraduationCap, Phone, Save, X, Loader2 } from "lucide-react";

export default function DoctorEditForm({ doctor, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    speciality: "",
    qualification: "",
    contact: "",
  });

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name ?? "",
        email: doctor.email ?? "",
        speciality: doctor.speciality ?? "",
        qualification: doctor.qualification ?? "",
        contact: doctor.contact ?? "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(doctor.id ?? doctor.email, form);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
          <input 
            name="email" 
            value={form.email} 
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Speciality</label>
          <div className="relative group">
            <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            <input 
              name="speciality" 
              value={form.speciality} 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Qualification</label>
          <div className="relative group">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            <input 
              name="qualification" 
              value={form.qualification} 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact</label>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
          <input 
            name="contact" 
            value={form.contact} 
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button 
          type="submit" 
          disabled={saving}
          className="flex-grow flex items-center justify-center gap-2 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-50 shadow-lg shadow-teal-600/20 transition-all active:scale-95"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          disabled={saving}
          className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
        >
          <X className="w-5 h-5" /> Cancel
        </button>
      </div>
    </form>
  );
}
