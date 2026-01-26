
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, UserRound, ArrowRight, Star, Clock, HeartPulse } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                <Star className="w-4 h-4 fill-teal-600" />
                <span>Trusted by over 100,000+ patients</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
                Your Health, Our <span className="text-teal-600">Priority.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Book appointments, manage profiles, and access medical services securely — all in one place. Experience seamless healthcare with MedSync.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-600/20"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-teal-400 hover:text-teal-600 transition-all flex items-center justify-center"
                >
                  Patient Login
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">500+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Specialists</div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">10k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Appointments</div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">4.9/5</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://picsum.photos/seed/medhealth/800/600" 
                  alt="Modern Healthcare" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Next Available</div>
                    <div className="text-sm font-bold text-slate-800">Today, 2:30 PM</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-10 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
                 <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Live Heart Rate</div>
                    <div className="text-sm font-bold text-slate-800">72 BPM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-3">Core Features</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Streamlined Healthcare Management</h3>
            <p className="text-slate-600 text-lg">
              Our platform provides all the tools you need to manage your medical journey with confidence and ease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-600/10 transition-all">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Instant Booking</h4>
              <p className="text-slate-600 leading-relaxed">
                Skip the waiting room. Find specialists and book your visit in seconds with our real-time availability sync.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-600/10 transition-all">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UserRound className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Digital Profiles</h4>
              <p className="text-slate-600 leading-relaxed">
                Securely store your medical history, prescriptions, and lab results in one encrypted digital vault.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-600/10 transition-all">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Privacy First</h4>
              <p className="text-slate-600 leading-relaxed">
                State-of-the-art encryption ensures that your sensitive data remains private and compliant with health regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center sm:text-left">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-600/10 blur-3xl rounded-full translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to experience better healthcare?
                </h2>
                <p className="text-slate-400 text-lg">
                  Join thousands of satisfied patients who have simplified their medical appointments.
                </p>
              </div>
              <div className="shrink-0">
                <Link 
                  to="/register" 
                  className="px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-xl hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/20 inline-block"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
