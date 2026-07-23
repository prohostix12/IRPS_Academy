import React from 'react';
import { 
  Building2, 
  Award, 
  Users, 
  CheckCircle2, 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Clock 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-16 bg-[#FAF6F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A0016]/10 text-[#7A0016] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#7A0016]" />
            <span>Heritage & Tradition</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#4A000E] tracking-tight">
            About Veritas University Network
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Empowering students across the globe with transformative higher education, pioneering research, and an unwavering commitment to truth and scholarship.
          </p>
        </div>

        {/* Vision & Mission Banner in Deep Maroon */}
        <div className="bg-gradient-to-br from-[#7A0016] to-[#4A000E] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
                Our Educational Philosophy
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-serif leading-tight">
                "Veritas et Excellentia" — Truth & Academic Mastery
              </h3>
              <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">
                Founded over a century ago, our network brings together top-tier public state universities, specialized tech institutes, and ivy business academies to deliver accessible, world-class education.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-amber-200 font-serif">138 Years</div>
                <p className="text-xs text-red-100 font-medium">Academic Heritage</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-amber-200 font-serif">45,000+</div>
                <p className="text-xs text-red-100 font-medium">Global Alumni Network</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-amber-200 font-serif">100%</div>
                <p className="text-xs text-red-100 font-medium">Accredited Degrees</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-amber-200 font-serif">12 Nobel</div>
                <p className="text-xs text-red-100 font-medium">Laureates & Scholars</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline of History */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-serif text-[#4A000E]">
              Milestones of Growth & Distinction
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Tracing our journey from a single historic college campus to a global academic destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-5 bg-[#FAF6F6] rounded-2xl border border-[#7A0016]/10 space-y-2">
              <span className="text-xl font-black text-[#7A0016] font-serif">1888</span>
              <h4 className="text-sm font-bold text-neutral-800">Founding of Heritage Quad</h4>
              <p className="text-xs text-neutral-600">Established first campus in Cambridge focusing on classical humanities and science.</p>
            </div>

            <div className="p-5 bg-[#FAF6F6] rounded-2xl border border-[#7A0016]/10 space-y-2">
              <span className="text-xl font-black text-[#7A0016] font-serif">1962</span>
              <h4 className="text-sm font-bold text-neutral-800">Veritas Tech Launch</h4>
              <p className="text-xs text-neutral-600">Pioneered computing and robotics research labs in Silicon Valley.</p>
            </div>

            <div className="p-5 bg-[#FAF6F6] rounded-2xl border border-[#7A0016]/10 space-y-2">
              <span className="text-xl font-black text-[#7A0016] font-serif">2005</span>
              <h4 className="text-sm font-bold text-neutral-800">$45M Endowment</h4>
              <p className="text-xs text-neutral-600">Expanded merit scholarships to ensure full need-based aid for deserving scholars.</p>
            </div>

            <div className="p-5 bg-[#FAF6F6] rounded-2xl border border-[#7A0016]/10 space-y-2">
              <span className="text-xl font-black text-[#7A0016] font-serif">2026</span>
              <h4 className="text-sm font-bold text-neutral-800">Unified Portal</h4>
              <p className="text-xs text-neutral-600">Launched centralized real-time admissions portal connecting 150+ international programs.</p>
            </div>

          </div>
        </div>

        {/* Chancellor's Welcome */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-200 flex flex-col lg:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
            alt="University Chancellor"
            referrerPolicy="no-referrer"
            className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-lg border-4 border-[#7A0016]"
          />

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#7A0016] uppercase tracking-wider">
              Chancellor's Welcome Address
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#4A000E]">
              "Welcome to a Community Driven by Purpose and Integrity"
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed italic">
              "Choosing a university is one of the most vital decisions of your lifetime. At Veritas, we do not merely teach curriculum—we nurture critical thinkers, ethically grounded leaders, and global innovators. We invite you to explore our campuses and claim your future."
            </p>
            <div>
              <p className="text-sm font-bold text-[#7A0016]">Dr. Arthur Vance, Ph.D.</p>
              <p className="text-xs text-neutral-500">Chancellor & President of University Board</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
