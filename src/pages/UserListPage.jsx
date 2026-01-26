
import React from 'react';
import { User, Mail, Shield, ChevronRight, Fingerprint } from 'lucide-react';

export default function UserListPage({ user }) {
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-teal-200 hover:shadow-2xl hover:shadow-slate-200/60 transition-all group cursor-pointer relative overflow-hidden">
      {/* Decorative background element on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 opacity-0 group-hover:opacity-100 blur-2xl -mr-12 -mt-12 transition-opacity duration-500"></div>

      <div className="flex items-center gap-6 relative z-10">
        {/* User Avatar Placeholder */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-inner ${
          isAdmin 
            ? 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white' 
            : 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'
        }`}>
          {isAdmin ? <Shield className="w-8 h-8" /> : <User className="w-8 h-8" />}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
              {user?.name || "Anonymous User"}
            </h4>
            <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${
              isAdmin 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                : 'bg-teal-50 text-teal-700 border-teal-100'
            }`}>
              <Fingerprint className="w-2.5 h-2.5" />
              {user?.role || "PATIENT"}
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-tight">{user?.email || "No email provided"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">ID Verified</span>
          <span className="text-xs font-bold text-slate-400">System Record #{Math.floor(Math.random() * 9000) + 1000}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
