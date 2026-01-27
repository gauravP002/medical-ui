
import React from 'react';
import { 
  Target, 
  Users, 
  Globe, 
  Heart, 
  ShieldCheck, 
  ChevronRight,
  Medal,
  Activity,
  Award
} from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-slate-50 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-teal-600 font-black uppercase tracking-widest text-sm mb-6">About MedSync</h2>
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-8">
            Revolutionizing the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Patient Experience</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            We are a team of healthcare providers and technology enthusiasts committed to making medical care more accessible, transparent, and patient-centric.
          </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Patients Served", value: "250K+", icon: Users },
            { label: "Expert Doctors", value: "1,200+", icon: Medal },
            { label: "Cities Covered", value: "45+", icon: Globe },
            { label: "Positive Reviews", value: "98%", icon: Heart }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-teal-600">
                <Target className="w-10 h-10" />
                <h3 className="text-3xl font-extrabold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed">
                To build the world's most trusted healthcare infrastructure where every patient receives the best medical attention without the burden of administrative friction.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-blue-600">
                <Activity className="w-10 h-10" />
                <h3 className="text-3xl font-extrabold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed">
                To create a global network of synchronized medical care where technology acts as the silent bridge between patients and healing.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden relative shadow-2xl">
              <img src="https://picsum.photos/seed/about/800/800" alt="Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-teal-600/10 mix-blend-multiply"></div>
            </div>
            {/* Achievement Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-50 flex items-center gap-6">
              <Award className="w-12 h-12 text-teal-600" />
              <div>
                <div className="text-2xl font-black text-slate-900">Top HealthTech</div>
                <div className="text-slate-400 font-bold text-sm tracking-widest uppercase">Award Winner 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Timeline */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-teal-400 font-black uppercase tracking-widest text-sm mb-4">Core Values</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">How we operate</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Patient First", desc: "Every decision starts with the question: How does this benefit the patient?" },
              { title: "Radical Transparency", desc: "No hidden costs, no complex medical jargon, just clear information." },
              { title: "Continuous Innovation", desc: "We are never satisfied. We constanty iterate to improve medical outcomes." }
            ].map((value, idx) => (
              <div key={idx} className="relative p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-colors">
                <div className="text-teal-400 font-black text-6xl opacity-20 absolute top-6 right-8">0{idx+1}</div>
                <h4 className="text-2xl font-bold mb-4 relative z-10">{value.title}</h4>
                <p className="text-slate-400 leading-relaxed relative z-10">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-4xl font-black text-slate-900 mb-8">Ready to join the movement?</h3>
          <p className="text-slate-500 text-lg mb-12">
            Experience the future of healthcare today. Create your account and book your first synchronized appointment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20">
              Get Started Now
            </button>
            <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-teal-600 transition-all flex items-center gap-2">
              Learn More <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
