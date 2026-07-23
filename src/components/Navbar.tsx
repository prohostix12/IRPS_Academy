import React, { useState } from 'react';
import { NavTab } from '../types';
import { Award, Menu, X, GraduationCap, Search, FileText, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenQuickApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenQuickApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'universities', label: 'Universities' },
    { id: 'programs', label: 'Programs' },
    { id: 'admissions', label: 'Admissions Portal' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#7A0016]/10 shadow-xs">
      {/* Top Banner Strip in Deep Maroon */}
      <div className="bg-[#58000F] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#9E1B32] text-white font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Fall 2026 Admissions
            </span>
            <span className="hidden sm:inline text-white/90">
              Applications open now for 100+ accredited degree programs.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 hover:text-red-200 transition-colors cursor-pointer" onClick={() => handleNavClick('contact')}>
              <Phone className="w-3 h-3 text-red-200" />
              Admissions Helpline: +1 (800) 555-UNIV
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <button 
              onClick={() => handleNavClick('admissions')} 
              className="hover:underline text-red-100 font-medium hidden md:inline"
            >
              Track Existing Application
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Deep Maroon & White branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#7A0016] to-[#4A000E] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#7A0016] rounded-[10px] flex items-center justify-center border border-white/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#7A0016] font-serif">
                  IRPS
                </span>
              </div>
              <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider -mt-1">
                Universities & Programs
              </p>
            </div>
          </div>

          {/* Desktop Navlinks */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#7A0016] bg-[#7A0016]/8 shadow-2xs'
                      : 'text-neutral-700 hover:text-[#7A0016] hover:bg-[#7A0016]/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#7A0016] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admissions')}
              className="px-4 py-2 text-sm font-semibold text-[#7A0016] hover:bg-[#7A0016]/10 rounded-lg transition-colors flex items-center gap-1.5 border border-[#7A0016]/20"
            >
              <FileText className="w-4 h-4 text-[#7A0016]" />
              Check Status
            </button>

            <button
              onClick={onOpenQuickApply}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#7A0016] to-[#58000F] hover:from-[#600010] hover:to-[#40000B] shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuickApply}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#7A0016] rounded-md sm:hidden"
            >
              Apply
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-[#7A0016] hover:bg-[#7A0016]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#7A0016]" /> : <Menu className="w-6 h-6 text-[#7A0016]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#7A0016]/15 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#7A0016] text-white'
                    : 'text-neutral-800 hover:bg-[#7A0016]/10 hover:text-[#7A0016]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
              </button>
            );
          })}

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                handleNavClick('admissions');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#7A0016] bg-[#7A0016]/10 rounded-lg border border-[#7A0016]/20"
            >
              Track Existing Application
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickApply();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#7A0016] hover:bg-[#600010] rounded-lg shadow-md"
            >
              Start Admission Application
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
