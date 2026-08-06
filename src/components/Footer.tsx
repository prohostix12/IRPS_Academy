import React from 'react';
import { NavTab } from '../types';
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenQuickApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuickApply }) => {
  return (
    <footer className="bg-[#001b48] text-white border-t border-white/10">
      
      {/* Upper Newsletter & Action Bar */}
      {/* <div className="bg-[#001233] py-10 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Stay Updated on Fall 2026 Deadlines
            </h3>
            <p className="text-xs text-blue-100/80">
              Subscribe to receive instant scholarship alerts, open house dates, and admissions webinars.
            </p>
          </div>

          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your student email..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-[#e8c47a]"
            />
            <button className="px-5 py-2.5 bg-white text-[#00296b] hover:bg-slate-100 font-bold text-xs rounded-xl shrink-0 transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand & Mission */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <Logo variant="full" theme="dark" className="h-10 sm:h-12 w-auto" />
          </div>

          <p className="text-xs text-blue-100/80 leading-relaxed">
            The premier university admissions portal providing direct access to world-class degree programs, merit scholarship grants, and real-time application processing.
          </p>

          <div className="flex items-center gap-2 text-xs text-[#e8c47a] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#e8c47a]" />
            <span>100% Accredited Partner Universities</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-[#e8c47a] uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2 text-xs text-blue-100/80">
            {['home', 'universities', 'programs', 'process', 'admissions', 'about', 'contact'].filter((tab) => tab !== 'admissions').map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    setActiveTab(tab as NavTab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white capitalize transition-colors cursor-pointer"
                >
                  {tab === 'admissions' ? 'Admissions Portal' : tab === 'about' ? 'About Us' : tab === 'contact' ? 'Contact Us' : tab === 'process' ? 'Process Flow' : tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Campuses */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-[#e8c47a] uppercase tracking-widest">Featured Campuses</h4>
          <ul className="space-y-2 text-xs text-blue-100/80">
            <li>Heritage State University</li>
            <li>Veritas Institute of Technology</li>
            <li>St. Jude College of Health Sciences</li>
            <li>Global Business & Economics Academy</li>
            <li>Veritas School of Law & Public Policy</li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="md:col-span-3 space-y-3 text-xs text-blue-100/80">
          <h4 className="text-xs font-bold text-[#e8c47a] uppercase tracking-widest">Admissions Contact</h4>
          <p className="flex items-top gap-2">
            <MapPin className="w-4 h-4 text-[#e8c47a]/80 shrink-0" />
            <span>705 7th floor manipal center Dickenson road, Mahatma Gandhi Rd, Yellappa Chetty Layout, Bengaluru, Karnataka 560042
</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#e8c47a]/80 shrink-0" />
            <span>+91 7904337416</span>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#e8c47a]/80 shrink-0" />
            <span>admissions@veritasportal.edu</span>
          </p>

          <button
            onClick={onOpenQuickApply}
            className="mt-2 w-full py-2.5 bg-white text-[#00296b] font-bold text-xs rounded-xl hover:bg-slate-100 shadow-md transition-colors"
          >
            Start Application Online
          </button>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 py-4 px-4 text-center text-[11px] text-blue-200/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 Veritas University Network. All rights reserved. Designed with deep royal blue & sand gold visual consistency for academic excellence.</span>
          <a href="/admin" className="text-[#e8c47a] hover:underline font-bold transition-all shrink-0">Admin Portal</a>
        </div>
      </div>

    </footer>
  );
};
