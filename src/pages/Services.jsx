
import React, { useState } from 'react';
import { 
  HeartPulse, 
  Brain, 
  Baby, 
  // Corrected icon name from Bones to Bone
  Bone, 
  Microscope, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

const SERVICES = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Advanced heart care focusing on prevention, diagnosis, and treatment of complex cardiac conditions.',
    icon: HeartPulse,
    color: 'teal',
    stats: '15+ Specialists'
  },
  {
    id: 'neurology',
    title: 'Neurology',
    description: 'Specialized care for disorders of the nervous system, brain, spinal cord, and peripheral nerves.',
    icon: Brain,
    color: 'blue',
    stats: '10+ Specialists'
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics',
    description: 'Compassionate medical care for infants, children, and adolescents with a gentle, child-friendly approach.',
    icon: Baby,
    color: 'rose',
    stats: '20+ Specialists'
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    description: 'Comprehensive treatment for musculoskeletal issues, sports injuries, and complex joint replacements.',
    // Corrected icon name from Bones to Bone
    icon: Bone,
    color: 'indigo',
    stats: '12+ Specialists'
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    description: 'State-of-the-art laboratory and imaging services providing accurate and rapid health assessments.',
    icon: Microscope,
    color: 'emerald',
    stats: '24/7 Service'
  },
  {
    id: 'general',
    title: 'General Health',
    description: 'Primary care services focused on long-term wellness and managing overall patient health.',
    icon: Stethoscope,
    color: 'slate',
    stats: '50+ Specialists'
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-white pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-teal-400 text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4">
            <Sparkles className="w-4 h-4" />
            <span>Excellence in Healthcare</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">
            World-Class <span className="text-teal-400 underline decoration-teal-400/30 underline-offset-8">Medical Services</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover a comprehensive range of medical specialities tailored to your needs. 
            Powered by modern technology and compassionate professionals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-teal-600/10 hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-lg ${
                service.id === 'cardiology' ? 'bg-teal-50 text-teal-600' :
                service.id === 'neurology' ? 'bg-blue-50 text-blue-600' :
                service.id === 'pediatrics' ? 'bg-rose-50 text-rose-600' :
                service.id === 'orthopedics' ? 'bg-indigo-50 text-indigo-600' :
                service.id === 'diagnostics' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
              }`}>
                <service.icon className="w-8 h-8" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{service.title}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-lg">
                  {service.stats}
                </span>
              </div>
              
              <p className="text-slate-500 leading-relaxed mb-8">
                {service.description}
              </p>
              
              <button className="flex items-center gap-2 text-teal-600 font-bold group/btn">
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-teal-600 font-black uppercase tracking-widest text-sm mb-4">Our Advantage</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Why Choose MedSync?</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Secure Data", desc: "Your health records are protected with bank-grade encryption." },
                { icon: Zap, title: "Fast Booking", desc: "Schedule appointments in under 30 seconds with real-time sync." },
                { icon: Activity, title: "Unified Portal", desc: "All your medical results and history in one accessible vault." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/medtech/800/600" alt="Tech" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                <Clock className="w-10 h-10 text-teal-400" />
                <div className="text-white">
                  <div className="text-sm font-medium opacity-80">24/7 Availability</div>
                  <div className="text-xl font-bold">Always here for you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
