
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Med<span className="text-teal-600">Sync</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Making healthcare accessible and convenient for everyone. Book appointments with top-rated professionals in just a few clicks.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 hover:text-teal-400 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-teal-400 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-teal-400 cursor-pointer" />
              <Linkedin className="w-5 h-5 hover:text-teal-400 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Specialists</Link></li>
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/register" className="hover:text-teal-400 transition-colors">Health Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Patient Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">FAQs</Link></li>
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+1 (800) MED-SYNC</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@medsync.care</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>123 Medical Plaza, San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} MedSync Technologies Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
