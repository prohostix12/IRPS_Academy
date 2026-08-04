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
  Clock,
  Target,
  Trophy,
  Lightbulb,
  Compass
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-16 bg-[#f4f7fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        {/* <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Heritage & Tradition</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            About Veritas University Network
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Empowering students across the globe with transformative higher education, pioneering research, and an unwavering commitment to truth and scholarship.
          </p>
        </div> */}

        {/* Vision & Mission Banner in Deep Royal Blue */}
        {/* <div className="bg-gradient-to-br from-[#00296b] to-[#001b48] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8c47a]">
                Our Educational Philosophy
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-serif leading-tight">
                "Veritas et Excellentia" — Truth & Academic Mastery
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                Founded over a century ago, our network brings together top-tier public state universities, specialized tech institutes, and ivy business academies to deliver accessible, world-class education.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-[#e8c47a] font-serif">138 Years</div>
                <p className="text-xs text-blue-100 font-medium">Academic Heritage</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-[#e8c47a] font-serif">45,000+</div>
                <p className="text-xs text-blue-100 font-medium">Global Alumni Network</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-[#e8c47a] font-serif">100%</div>
                <p className="text-xs text-blue-100 font-medium">Accredited Degrees</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-3xl font-black text-[#e8c47a] font-serif">12 Nobel</div>
                <p className="text-xs text-blue-100 font-medium">Laureates & Scholars</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* IRPS Vision & Mission Section */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-[#00296b]" />
              <span>Purpose & Outlook</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold font-serif text-[#001b48]">
              Vision & Mission
            </h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Guided by a commitment to academic leadership, innovation, and global outreach, our vision and mission statements shape the future of our scholars and partner institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Mission Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#00296b] to-[#001b48] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#e8c47a]/20 flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle background glow decoration */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#e8c47a]/10 blur-3xl group-hover:bg-[#e8c47a]/20 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#e8c47a] flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-[#00296b]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#e8c47a]">
                    Our Mission
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold font-serif mt-1 text-white">
                    Global Leadership & Excellence
                  </h4>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-blue-100 font-serif italic border-l-2 border-[#e8c47a]/50 pl-4 py-1">
                  "To ensure that at least one of our students holds a top leadership position in every leading multinational corporation, reflecting our commitment to excellence, innovation, and global leadership."
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-[#e8c47a]" />
                </div>
                <p className="text-xs text-blue-200/90 font-medium">
                  Cultivating future chief executives and global innovators.
                </p>
              </div>
            </div>

            {/* Vision Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Vision Card 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-neutral-200 hover:border-[#00296b]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#00296b]/5 flex items-center justify-center border border-[#00296b]/10">
                  <Globe2 className="w-6 h-6 text-[#00296b]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00296b]/10 text-[#00296b] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                      Vision 1
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#001b48] font-serif">
                      Global Excellence
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                    To become a globally recognized institution in higher education, research, and professional development by delivering academic excellence, fostering innovation, and creating sustainable societal impact through transformative learning and research.
                  </p>
                </div>
              </div>

              {/* Vision Card 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-neutral-200 hover:border-[#00296b]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#00296b]/5 flex items-center justify-center border border-[#00296b]/10">
                  <Lightbulb className="w-6 h-6 text-[#00296b]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00296b]/10 text-[#00296b] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                      Vision 2
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#001b48] font-serif">
                      Innovation & Leadership
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                    To be India's leading center for research, innovation, and lifelong learning, empowering individuals and organizations with world-class education, industry-driven knowledge, and ethical leadership for a rapidly evolving global economy.
                  </p>
                </div>
              </div>

              {/* Vision Card 3 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-neutral-200 hover:border-[#00296b]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#00296b]/5 flex items-center justify-center border border-[#00296b]/10">
                  <Compass className="w-6 h-6 text-[#00296b]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00296b]/10 text-[#00296b] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                      Vision 3
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#001b48] font-serif">
                      Future-Focused Growth
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                    To build a world-class academic ecosystem that bridges education, research, and industry, enabling learners, researchers, and professionals to drive innovation, entrepreneurship, and sustainable development while contributing to national and global progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline of History */}
        {/* <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-serif text-[#001b48]">
              Milestones of Growth & Distinction
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Tracing our journey from a single historic college campus to a global academic destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-5 bg-[#f4f7fa] rounded-2xl border border-[#00296b]/10 space-y-2">
              <span className="text-xl font-black text-[#00296b] font-serif">1888</span>
              <h4 className="text-sm font-bold text-neutral-800">Founding of Heritage Quad</h4>
              <p className="text-xs text-neutral-600">Established first campus in Cambridge focusing on classical humanities and science.</p>
            </div>

            <div className="p-5 bg-[#f4f7fa] rounded-2xl border border-[#00296b]/10 space-y-2">
              <span className="text-xl font-black text-[#00296b] font-serif">1962</span>
              <h4 className="text-sm font-bold text-neutral-800">Veritas Tech Launch</h4>
              <p className="text-xs text-neutral-600">Pioneered computing and robotics research labs in Silicon Valley.</p>
            </div>

            <div className="p-5 bg-[#f4f7fa] rounded-2xl border border-[#00296b]/10 space-y-2">
              <span className="text-xl font-black text-[#00296b] font-serif">2005</span>
              <h4 className="text-sm font-bold text-neutral-800">$45M Endowment</h4>
              <p className="text-xs text-neutral-600">Expanded merit scholarships to ensure full need-based aid for deserving scholars.</p>
            </div>

            <div className="p-5 bg-[#f4f7fa] rounded-2xl border border-[#00296b]/10 space-y-2">
              <span className="text-xl font-black text-[#00296b] font-serif">2026</span>
              <h4 className="text-sm font-bold text-neutral-800">Unified Portal</h4>
              <p className="text-xs text-neutral-600">Launched centralized real-time admissions portal connecting 150+ international programs.</p>
            </div>

          </div>
        </div> */}

        {/* Chancellor's Welcome */}
        {/* <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-200 flex flex-col lg:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
            alt="University Chancellor"
            referrerPolicy="no-referrer"
            className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-lg border-4 border-[#00296b]"
          />

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#00296b] uppercase tracking-wider">
              Chancellor's Welcome Address
            </span>
            <h3 className="text-2xl font-bold font-serif text-[#001b48]">
              "Welcome to a Community Driven by Purpose and Integrity"
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed italic">
              "Choosing a university is one of the most vital decisions of your lifetime. At Veritas, we do not merely teach curriculum—we nurture critical thinkers, ethically grounded leaders, and global innovators. We invite you to explore our campuses and claim your future."
            </p>
            <div>
              <p className="text-sm font-bold text-[#00296b]">Dr. Arthur Vance, Ph.D.</p>
              <p className="text-xs text-neutral-500">Chancellor & President of University Board</p>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};
