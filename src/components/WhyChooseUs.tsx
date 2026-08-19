"use client";

import React from 'react';
import { NavTab } from '../types';
import { 
  GraduationCap, 
  Award, 
  Cpu, 
  Users, 
  Globe2, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

interface WhyChooseUsProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenQuickApply?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ setActiveTab, onOpenQuickApply }) => {
  const pillars = [
    {
      title: "Accredited University Alliance",
      description: "Partnered with leading UGC-approved, NAAC-accredited, and internationally recognized universities to provide credible doctoral opportunities.",
      icon: GraduationCap,
    },
    {
      title: "Years of Legacy",
      description: "A legacy of academic excellence, trust, and successful doctoral mentorship.",
      icon: Award,
    },
    {
      title: "AI-Enabled Research Platform",
      description: "Advanced AI-powered tools for research planning, writing support, literature review, plagiarism guidance, and academic productivity.",
      icon: Cpu,
    },
    {
      title: "Personalized Expert Mentorship",
      description: "Dedicated one-to-one guidance from experienced research mentors throughout every stage of your doctoral journey—from admission to successful thesis submission.",
      icon: Users,
    },
    {
      title: "Extending Impact Across Countries",
      description: "Building a global community of researchers through international collaborations, academic partnerships, and world-class doctoral mentorship.",
      icon: Globe2,
    }
  ];

  const supportPoints = [
    "Research topic identification",
    "Research proposal & synopsis development",
    "Literature review guidance",
    "Research methodology support",
    "Thesis writing assistance",
    "Plagiarism checking",
    "Journal publication guidance",
    "Conference publication support",
    "Thesis presentation (PPT) preparation",
    "Viva-voce preparation"
  ];

  return (
    <section className="py-20 bg-[#F4F7FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Rounded Box Container */}
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-lg p-8 sm:p-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left Column (4/12 cols) - Introduction & CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                  Why Choose IRPS?
                </span>
                {/* Accent Yellow Underline matching the logo yellow */}
                <div className="w-10 h-0.5 bg-[#e8c47a]" />
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#001b48] leading-tight tracking-tight">
                India's Most Trusted <span className="text-[#e8c47a]">Mentorship Platform</span>
              </h2>
              
              <p className="text-sm text-neutral-600 leading-relaxed">
                Explore world-renowned university campuses, discover accredited degree programs, calculate scholarship grants, and submit your official application through our unified admissions portal.
              </p>
              
              {/* CTA Button with logo yellow and dark-blue text for best contrast */}
              <button 
                onClick={() => setActiveTab('universities')}
                className="inline-block px-7 py-3.5 bg-[#e8c47a] hover:bg-[#dcb86e] text-[#00296b] text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform active:scale-95 cursor-pointer"
              >
                Explore Campuses
              </button>
            </div>

            {/* Middle Column (4/12 cols) - 5 Pillars list */}
            <div className="lg:col-span-4 divide-y divide-slate-100">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div 
                    key={idx}
                    className="flex gap-4 items-start py-5 first:pt-0 last:pb-0 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#e8c47a] text-[#e8c47a] bg-white flex items-center justify-center shrink-0 group-hover:bg-[#e8c47a]/5 transition-colors duration-300">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#001b48] font-serif leading-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column (4/12 cols) - End-to-End Support Checklist */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-8 lg:pt-0 lg:pl-8">
              
              {/* Header inside checklist card */}
              <div className="flex gap-4 items-start pb-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full border border-[#00296b] text-[#00296b] bg-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-extrabold text-[#001b48] uppercase tracking-wider">
                    End-to-End Support
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Guiding you through all doctoral stages
                  </p>
                </div>
              </div>

              {/* Support checklist items */}
              <div className="space-y-3 pt-5">
                {supportPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 group">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c47a] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-neutral-600 font-medium font-sans leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
