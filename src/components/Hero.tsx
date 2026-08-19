"use client";

import React, { useState, useRef } from 'react';
import { HERO_CAMPUS_IMAGE } from '../data/universityData';
import { NavTab } from '../types';
import { useData } from '../context/DataContext';
import { 
  Search, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  ShieldCheck, 
  Calculator,
  Compass,
  Volume2,
  VolumeX
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
  onSearchSubmit: (category: string, level: string, query: string) => void;
  onOpenQuickApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onSearchSubmit, onOpenQuickApply }) => {
  const { universities } = useData();
  const [degreeLevel, setDegreeLevel] = useState<string>('All');
  const [uniFilter, setUniFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    if (!iframeRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: newMuted ? 'mute' : 'unMute' }),
      '*'
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(uniFilter, degreeLevel, searchQuery);
    setActiveTab('programs');
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between bg-[#001b48] text-white overflow-hidden">
      
      {/* High-Quality Campus Background Image with referrerPolicy */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_CAMPUS_IMAGE}
          alt="Historic University Campus Lawn and Clocktower"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
        />
        
        {/* Rich Blue Gradient Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001b48]/95 via-[#00296b]/85 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001b48] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,41,107,0.6)_0%,transparent_70%)]" />
      </div>

      {/* Decorative Subtle Geometric Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Hero Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 w-full flex-grow flex flex-col justify-center">
        
        {/* Two-column layout for text and video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Badge in Blue & Gold Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-blue-100 shadow-lg animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-[#e8c47a] animate-pulse" />
              <Sparkles className="w-4 h-4 text-[#e8c47a]" />
              <span>IRPS – Inspiring Research. Shaping Future Leaders.

Quick Apply</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.08] text-white drop-shadow-md">
              India's Most Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c47a] via-amber-100 to-white">Mentorship Platform</span> for Doctoral Aspirants
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-blue-100/90 font-normal leading-relaxed max-w-2xl">
              Transforming Research. Empowering Scholars. Building Global Academic Leaders.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuickApply}
                className="px-7 py-4 rounded-xl text-base font-semibold text-white bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/25 shadow-lg transition-all flex items-center gap-3 cursor-pointer group"
              >
                <GraduationCap className="w-5 h-5 text-[#e8c47a]" />
                <span>Quick Apply</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Premium Video Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-lg aspect-video rounded-3xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(0,168,204,0.2)] hover:shadow-[0_0_40px_rgba(0,168,204,0.4)] transition-all duration-500 overflow-hidden backdrop-blur-md">
              <div className="w-full h-full bg-[#001233]/45 rounded-[22px] overflow-hidden relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                  <iframe
                    ref={iframeRef}
                    className="w-[116%] h-[116%] absolute -left-[8%] -top-[8%] object-cover pointer-events-none select-none"
                    src="https://www.youtube-nocookie.com/embed/rmYiiNvFsrY?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=rmYiiNvFsrY&controls=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&cc_load_policy=3"
                    title="IRPS University Campus Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                
                {/* Custom Overlay for Audio Control (Mute/Unmute) */}
                <div className="absolute bottom-4 left-4 z-20">
                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:bg-black/85 hover:scale-110 transition-all shadow-lg cursor-pointer group"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white/90 group-hover:text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white/90 group-hover:text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Search & Filter Card */}
        <div className="mt-12 w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 text-neutral-900">
          
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-200/80">
            <Search className="w-5 h-5 text-[#00296b]" />
            <h2 className="text-base font-bold text-[#00296b] uppercase tracking-wider font-serif">
              Quick University & Program Finder
            </h2>
            <span className="text-xs bg-[#00296b]/10 text-[#00296b] px-2 py-0.5 rounded-full font-semibold ml-auto">
              Real-time Directory
            </span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            
            {/* Degree Level Selector */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Degree Level
              </label>
              <div className="relative">
                <select
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-3 text-sm font-medium text-neutral-800 focus:ring-2 focus:ring-[#00296b] focus:border-[#00296b] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="All">All Doctoral Degrees</option>
                  <option value="PhD">PhD</option>
                  <option value="EdD">EdD</option>
                  <option value="DBA">DBA</option>
                  <option value="EngD">EngD</option>
                  <option value="DSc / ScD">DSc / ScD</option>
                  <option value="DPhil">DPhil</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-neutral-400 text-xs">▼</div>
              </div>
            </div>

             {/* University Selector */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                University
              </label>
              <div className="relative">
                <select
                  value={uniFilter}
                  onChange={(e) => setUniFilter(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-3 text-sm font-medium text-neutral-800 focus:ring-2 focus:ring-[#00296b] focus:border-[#00296b] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="All">All Universities</option>
                  {(universities || []).map((uni) => (
                    <option key={uni.id} value={uni.name}>
                      {uni.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-neutral-400 text-xs">▼</div>
              </div>
            </div>

            {/* Keyword Input */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Keyword / University
              </label>
              <input
                type="text"
                placeholder="e.g. AI, Heritage, Law..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-3 text-sm font-medium text-neutral-800 focus:ring-2 focus:ring-[#00296b] focus:border-[#00296b] outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Find</span>
              </button>
            </div>

          </form>

          {/* Quick Tags underneath */}
          <div className="mt-3.5 pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-700">Popular Searches:</span>
            {['Ph.D. Computer Science', 'DBA Global Strategy', 'DSc Artificial Intelligence', 'DPhil Law', 'EngD Bioengineering'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  onSearchSubmit('All', 'All', tag);
                  setActiveTab('programs');
                }}
                className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-[#00296b]/10 hover:text-[#00296b] transition-colors border border-neutral-200/60 font-medium"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Hero Statistics Strip in Deep Blue Footer */}
      <div className="relative z-10 bg-[#001233]/90 backdrop-blur-md border-t border-white/10 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#e8c47a] font-serif flex items-center justify-center gap-1.5">
              <Building2 className="w-5 h-5 text-[#e8c47a]/80" />
              <span>150+</span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium uppercase tracking-wider">Partner Universities</p>
          </div>

          <div className="space-y-1 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-white font-serif flex items-center justify-center gap-1.5">
              <BookOpen className="w-5 h-5 text-[#e8c47a]/80" />
              <span>1,200+</span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium uppercase tracking-wider">Accredited Programs</p>
          </div>

          <div className="space-y-1 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-[#e8c47a] font-serif flex items-center justify-center gap-1.5">
              <Award className="w-5 h-5 text-[#e8c47a]/80" />
              <span>$45+</span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium uppercase tracking-wider">Scholarships Awarded</p>
          </div>

          <div className="space-y-1 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-white font-serif flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#e8c47a]/80" />
              <span>98.4%</span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium uppercase tracking-wider">Placement Success Rate</p>
          </div>

        </div>
      </div>

    </div>
  );
};
