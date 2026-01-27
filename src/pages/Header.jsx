
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-teal-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Med<span className="text-teal-600">Sync</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center font-medium text-slate-600">
            <Link to="/" className="hover:text-teal-600 transition-colors">Find Doctors</Link>
            <Link to="/services" className="hover:text-teal-600 transition-colors">Services</Link>
            <Link to="about/" className="hover:text-teal-600 transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5"
            >
              Join Now
            </Link>
            <button className="md:hidden p-2 text-slate-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
