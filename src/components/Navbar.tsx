"use client";

import React, { useState } from 'react';
import { NavTab } from '../types';
import { Award, Menu, X, GraduationCap, Search, FileText, ChevronRight, Phone } from 'lucide-react';
import { Logo } from './Logo';

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
    // { id: 'admissions', label: 'Admissions Portal' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#00296b]/10 shadow-xs">
      {/* Top Banner Strip in Deep Royal Blue */}
      <div className="bg-[#001b48] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#e8c47a] text-[#00296b] font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Fall 2026 Admissions
            </span>
            <span className="hidden sm:inline text-white/90">
              Applications open now for 100+ accredited degree programs.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 hover:text-[#e8c47a] transition-colors cursor-pointer" onClick={() => handleNavClick('contact')}>
              <Phone className="w-3 h-3 text-[#e8c47a]" />
              Admissions Helpline: +1 (800) 555-UNIV
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            {/* <button 
              onClick={() => handleNavClick('admissions')} 
              className="hover:underline text-[#e8c47a] font-medium hidden md:inline"
            >
              Track Existing Application
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Deep Royal Blue & Sand Gold branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <Logo variant="full" theme="light" className="h-10 sm:h-12 w-auto group-hover:scale-102 transition-transform duration-300" />
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
                      ? 'text-[#00296b] bg-[#00296b]/8 shadow-2xs'
                      : 'text-neutral-700 hover:text-[#00296b] hover:bg-[#00296b]/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00296b] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          {/* <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admissions')}
              className="px-4 py-2 text-sm font-semibold text-[#00296b] hover:bg-[#00296b]/10 rounded-lg transition-colors flex items-center gap-1.5 border border-[#00296b]/20"
            >
              <FileText className="w-4 h-4 text-[#00296b]" />
              Check Status
            </button>

            <button
              onClick={onOpenQuickApply}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#00296b] to-[#001b48] hover:from-[#002054] hover:to-[#001233] shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div> */}

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* <button
              onClick={onOpenQuickApply}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#00296b] rounded-md sm:hidden"
            >
              Apply
            </button> */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-[#00296b] hover:bg-[#00296b]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00296b]" /> : <Menu className="w-6 h-6 text-[#00296b]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#00296b]/15 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#00296b] text-white'
                    : 'text-neutral-800 hover:bg-[#00296b]/10 hover:text-[#00296b]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
              </button>
            );
          })}

          {/* <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                handleNavClick('admissions');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#00296b] bg-[#00296b]/10 rounded-lg border border-[#00296b]/20"
            >
              Track Existing Application
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickApply();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#00296b] hover:bg-[#002054] rounded-lg shadow-md"
            >
              Start Admission Application
            </button>
          </div> */}
        </div>
      )}
    </header>
  );
};
