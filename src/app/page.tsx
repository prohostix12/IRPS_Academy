"use client";

import React, { useState } from 'react';
import { NavTab, Program } from '../types';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { UniversitiesSection } from '../components/UniversitiesSection';
import { ProgramsSection } from '../components/ProgramsSection';
// import { AdmissionsPortal } from '../components/AdmissionsPortal';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { QuickApplyModal } from '../components/QuickApplyModal';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { ProcessFlow } from '../components/ProcessFlow';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';

export default function Page() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedUniFilter, setSelectedUniFilter] = useState<string>('All');
  const [selectedDegreeFilter, setSelectedDegreeFilter] = useState<string>('All');
  const [selectedSearchQuery, setSelectedSearchQuery] = useState<string>('');
  // const [selectedProgramForApply, setSelectedProgramForApply] = useState<Program | null>(null);
  
  // Quick Apply Modal State
  const [isQuickApplyOpen, setIsQuickApplyOpen] = useState<boolean>(false);
  // const [quickApplyUni, setQuickApplyUni] = useState<string>('');

  // Toast Notification State
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const handleSearchFromHero = (uniFilter: string, level: string, query: string) => {
    setSelectedUniFilter(uniFilter);
    setSelectedDegreeFilter(level);
    setSelectedSearchQuery(query);
    setActiveTab('programs');
  };

  const handleSelectUniversity = (uniName: string) => {
    setSelectedUniFilter(uniName);
    setSelectedDegreeFilter('All');
    setSelectedSearchQuery('');
  };

  // const handleApplyToProgram = (program: Program) => {
  //   setSelectedProgramForApply(program);
  //   setActiveTab('admissions');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   showToast(`Initiated application for ${program.title}`);
  // };

  // const handleOpenQuickApplyWithUni = (uniName: string) => {
  //   setQuickApplyUni(uniName);
  //   setIsQuickApplyOpen(true);
  // };

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-neutral-900 flex flex-col font-sans selection:bg-[#00296b] selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00296b] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#e8c47a]/40 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-[#e8c47a]" />
          <span className="text-xs font-bold">{notification}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-white/80 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickApply={() => setIsQuickApplyOpen(true)}
      />

      {/* Main View Content Switcher */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            {/* Landing Page Hero Section */}
            <Hero
              setActiveTab={setActiveTab}
              onSearchSubmit={handleSearchFromHero}
              onOpenQuickApply={() => setIsQuickApplyOpen(true)}
            />

            {/* Featured Universities Section Preview */}
            <UniversitiesSection
              setActiveTab={setActiveTab}
              setSelectedUniversityFilter={handleSelectUniversity}
              onOpenQuickApplyWithUni={() => {}}
            />

            {/* Featured Programs Section Preview */}
            <ProgramsSection
              setActiveTab={setActiveTab}
              selectedUniversityFilter={selectedUniFilter}
              selectedDegreeFilter={selectedDegreeFilter}
              selectedSearchQuery={selectedSearchQuery}
              onApplyToProgram={() => {}}
            />

            {/* Why Choose Us Section */}
            <WhyChooseUs setActiveTab={setActiveTab} onOpenQuickApply={() => setIsQuickApplyOpen(true)} />

            {/* Testimonials Section */}
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'universities' && (
          <UniversitiesSection
            setActiveTab={setActiveTab}
            setSelectedUniversityFilter={handleSelectUniversity}
            onOpenQuickApplyWithUni={() => {}}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsSection
            setActiveTab={setActiveTab}
            selectedUniversityFilter={selectedUniFilter}
            selectedDegreeFilter={selectedDegreeFilter}
            selectedSearchQuery={selectedSearchQuery}
            onApplyToProgram={() => {}}
          />
        )}

        {/* {activeTab === 'admissions' && (
          <AdmissionsPortal
            preselectedProgram={selectedProgramForApply}
            preselectedUniversity={quickApplyUni}
          />
        )} */}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}

        {activeTab === 'process' && (
          <ProcessFlow />
        )}
      </main>

      {/* Quick Apply Modal */}
      <QuickApplyModal
        isOpen={isQuickApplyOpen}
        onClose={() => setIsQuickApplyOpen(false)}
        onSubmittedSuccess={() => {
          showToast("Inquiry submitted successfully!");
        }}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuickApply={() => setIsQuickApplyOpen(true)}
      />

    </div>
  );
}

