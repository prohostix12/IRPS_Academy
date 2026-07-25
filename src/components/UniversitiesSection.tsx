"use client";

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { University, Program, NavTab } from '../types';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Award, 
  Users, 
  Compass, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Mail, 
  ExternalLink,
  BookOpen,
  Clock,
  DollarSign,
  Briefcase,
  FileCheck
} from 'lucide-react';

interface UniversitiesSectionProps {
  setActiveTab: (tab: NavTab) => void;
  setSelectedUniversityFilter: (uniName: string) => void;
  onOpenQuickApplyWithUni?: (uniName: string) => void;
}

export const UniversitiesSection: React.FC<UniversitiesSectionProps> = ({ 
  setActiveTab, 
  setSelectedUniversityFilter,
  onOpenQuickApplyWithUni 
}) => {
  const { universities: UNIVERSITIES, programs: PROGRAMS, loading } = useData();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalUni, setActiveModalUni] = useState<University | null>(null);
  const [activeProgramModal, setActiveProgramModal] = useState<Program | null>(null);

  if (loading) {
    return (
      <div className="py-16 bg-[#f4f7fa] min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-[#00296b] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-neutral-600 font-sans">Loading partner universities...</p>
        </div>
      </div>
    );
  }

  const filteredUniversities = (UNIVERSITIES || []).filter((uni) => {
    const matchesType = selectedType === 'All' || uni.type === selectedType;
    const matchesQuery = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.topPrograms.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesQuery;
  });

  const handleExplorePrograms = (uniName: string) => {
    setSelectedUniversityFilter(uniName);
    setActiveTab('programs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-16 bg-[#f4f7fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Accredited Campus Network</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            Explore Partner Universities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Discover premier institutions offering modern research laboratories, world-class faculty, generous financial aid, and vibrant student life.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-[#00296b]/10 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Search by university name, city, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-800 focus:ring-2 focus:ring-[#00296b] focus:border-[#00296b] outline-none"
              />
              <Building2 className="w-5 h-5 text-neutral-400 absolute left-3 top-3.5" />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {['All', 'Public State', 'Private Ivy', 'Institute of Technology', 'Specialized College'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-[#00296b] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-[#00296b]/10 hover:text-[#00296b]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni) => (
            <div 
              key={uni.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-neutral-200/80 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={uni.image}
                  alt={uni.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <span className="absolute top-3 left-3 bg-[#00296b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                  {uni.type}
                </span>

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#00296b] text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
                  {uni.ranking}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-medium text-amber-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-200" />
                    <span>{uni.location}</span>
                  </p>
                  <h3 className="text-xl font-bold font-serif leading-snug line-clamp-1">
                    {uni.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                
                <div>
                  <p className="text-xs text-[#00296b] font-semibold italic mb-3">
                    "{uni.tagline}"
                  </p>
                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {uni.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 bg-[#f4f7fa] rounded-xl p-3 text-xs border border-[#00296b]/10">
                  <div>
                    <span className="text-neutral-500 font-medium block">Acceptance Rate</span>
                    <span className="font-bold text-neutral-900">{uni.acceptanceRate}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block">Total Students</span>
                    <span className="font-bold text-neutral-900">{uni.totalStudents}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block">Tuition / Year</span>
                    <span className="font-bold text-[#00296b]">{uni.tuitionRange.split('/')[0]}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block">Est. Campus</span>
                    <span className="font-bold text-neutral-900">{uni.established}</span>
                  </div>
                </div>

                {/* Offered Programs List */}
                <div>
                  <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#00296b]" />
                    <span>Offered Doctoral Programs</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    {(PROGRAMS || [])
                      .filter((p) => p.universityId === uni.id)
                      .map((prog) => (
                        <button
                          key={prog.id}
                          onClick={() => setActiveProgramModal(prog)}
                          className="flex items-center justify-between text-left px-3 py-2 bg-neutral-50 hover:bg-[#00296b]/5 border border-neutral-200/80 hover:border-[#00296b]/35 rounded-xl transition-all cursor-pointer group/item"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-neutral-800 line-clamp-1 group-hover/item:text-[#00296b] transition-colors">
                              {prog.title}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-medium mt-0.5">
                              {prog.degreeLevel} • {prog.format}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#00296b] group-hover/item:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </button>
                      ))}
                    {(PROGRAMS || []).filter((p) => p.universityId === uni.id).length === 0 && (
                      <span className="text-xs text-neutral-500 italic">No programs listed yet.</span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalUni(uni)}
                    className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-[#00296b]/10 text-[#00296b] font-semibold text-xs rounded-xl transition-colors border border-[#00296b]/20 cursor-pointer text-center"
                  >
                    View Details & Tour
                  </button>

                  <button
                    onClick={() => handleExplorePrograms(uni.name)}
                    className="flex-1 py-2.5 px-3 bg-[#00296b] hover:bg-[#002054] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Programs</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* University Detail Modal */}
      {activeModalUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            
            {/* Modal Header Image */}
            <div className="relative h-64">
              <img
                src={activeModalUni.image}
                alt={activeModalUni.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setActiveModalUni(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="bg-[#00296b] text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {activeModalUni.ranking}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif mt-1">
                  {activeModalUni.name}
                </h3>
                <p className="text-xs text-[#e8c47a] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeModalUni.location} • Founded {activeModalUni.established}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-neutral-800">
              
              <div>
                <h4 className="text-lg font-bold text-[#00296b] font-serif mb-2">Overview & Heritage</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {activeModalUni.description}
                </p>
              </div>

              {/* Campus Highlights */}
              <div>
                <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">Campus Features & Advantages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalUni.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#f4f7fa] rounded-lg border border-[#00296b]/10 text-xs font-medium text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-[#00296b] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offered Doctoral Programs */}
              <div>
                <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">Offered Doctoral Programs</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(PROGRAMS || [])
                    .filter((p) => p.universityId === activeModalUni.id)
                    .map((prog) => (
                      <div 
                        key={prog.id}
                        className="bg-neutral-50 hover:bg-[#00296b]/5 p-3 rounded-xl border border-neutral-200 hover:border-[#00296b]/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="inline-block text-[9px] font-bold text-[#00296b] bg-[#00296b]/10 px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                            {prog.degreeLevel} • {prog.format}
                          </span>
                          <h5 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                            {prog.title}
                          </h5>
                          <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                            {prog.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-neutral-200/60 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#00296b]">
                            ${prog.tuitionPerYear.toLocaleString()} / yr
                          </span>
                          <button
                            onClick={() => {
                              setActiveProgramModal(prog);
                            }}
                            className="text-[11px] font-bold text-[#00296b] hover:text-[#002054] inline-flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Learn More</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  {(PROGRAMS || []).filter((p) => p.universityId === activeModalUni.id).length === 0 && (
                    <p className="text-xs text-neutral-500 italic sm:col-span-2">No programs available currently.</p>
                  )}
                </div>
              </div>

              {/* Photo Gallery Thumbnails */}
              {activeModalUni.gallery.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">Campus Gallery Preview</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {activeModalUni.gallery.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt="Campus Building"
                        referrerPolicy="no-referrer"
                        className="w-full h-24 object-cover rounded-xl shadow-xs"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#00296b]" />
                  <span>Admissions Contact: <strong>{activeModalUni.contactEmail}</strong></span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveModalUni(null);
                      handleExplorePrograms(activeModalUni.name);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-[#00296b] hover:bg-[#002054] text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    View Degree Programs
                  </button>
                  {/* {onOpenQuickApplyWithUni && (
                    <button
                      onClick={() => {
                        const uniName = activeModalUni.name;
                        setActiveModalUni(null);
                        onOpenQuickApplyWithUni(uniName);
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-md"
                    >
                      Apply Now
                    </button>
                  )} */}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {activeProgramModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
          style={{ zIndex: 9999 }}
          onClick={() => setActiveProgramModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 text-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#00296b] bg-[#00296b]/10 px-2.5 py-0.5 rounded">
                  {activeProgramModal.degreeLevel} • {activeProgramModal.category}
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#001b48] mt-2 leading-snug">
                  {activeProgramModal.title}
                </h3>
                <p className="text-sm font-semibold text-neutral-600">
                  {activeProgramModal.universityName}
                </p>
              </div>

              <button
                onClick={() => setActiveProgramModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f4f7fa] p-4 rounded-xl border border-[#00296b]/10 text-xs">
              <div>
                <span className="text-neutral-500 font-medium block">Duration</span>
                <span className="font-bold text-neutral-900">{activeProgramModal.duration}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-medium block">Credits</span>
                <span className="font-bold text-neutral-900">{activeProgramModal.credits} Hours</span>
              </div>
              <div>
                <span className="text-neutral-500 font-medium block">Annual Tuition</span>
                <span className="font-bold text-[#00296b]">${activeProgramModal.tuitionPerYear.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-medium block">Deadline</span>
                <span className="font-bold text-neutral-900">{activeProgramModal.applicationDeadline}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-[#00296b] uppercase tracking-wider mb-2">Program Overview</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {activeProgramModal.description}
              </p>
            </div>

            {/* Prerequisites */}
            <div>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#00296b]" />
                <span>Admission Prerequisites</span>
              </h4>
              <p className="text-xs text-neutral-700 bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
                {activeProgramModal.prerequisites}
              </p>
            </div>

            {/* Curriculum Highlights */}
            <div>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">Curriculum Modules</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProgramModal.curriculumHighlights.map((module, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg text-xs font-medium text-neutral-800 border border-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00296b]" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Outcomes */}
            <div>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#00296b]" />
                <span>Career Outcomes</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProgramModal.careerOutcomes.map((career, i) => (
                  <span key={i} className="text-xs bg-[#00296b]/10 text-[#00296b] font-semibold px-3 py-1 rounded-full">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveProgramModal(null)}
                className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
