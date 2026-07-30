"use client";

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Program, NavTab } from '../types';
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowRight, 
  X, 
  Layers, 
  HelpCircle,
  Briefcase,
  FileCheck
} from 'lucide-react';

interface ProgramsSectionProps {
  setActiveTab: (tab: NavTab) => void;
  selectedUniversityFilter?: string;
  onApplyToProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ 
  setActiveTab, 
  selectedUniversityFilter = '',
  onApplyToProgram
}) => {
  const { universities: UNIVERSITIES, programs: PROGRAMS, loading } = useData();
  const [degreeFilter, setDegreeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [uniFilter, setUniFilter] = useState<string>(selectedUniversityFilter || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Program Details Modal State
  const [activeProgramModal, setActiveProgramModal] = useState<Program | null>(null);

  // Compare Drawer State
  const [comparisonList, setComparisonList] = useState<Program[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const toggleCompare = (program: Program) => {
    if (comparisonList.some(p => p.id === program.id)) {
      setComparisonList(comparisonList.filter(p => p.id !== program.id));
    } else {
      if (comparisonList.length >= 3) {
        alert('You can compare a maximum of 3 programs at once.');
        return;
      }
      setComparisonList([...comparisonList, program]);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-[#f4f7fa] min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-[#00296b] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-neutral-600 font-sans">Loading degree programs...</p>
        </div>
      </div>
    );
  }

  const filteredPrograms = (PROGRAMS || []).filter((prog) => {
    const matchesDegree = degreeFilter === 'All' || prog.degreeLevel === degreeFilter;
    const matchesCategory = categoryFilter === 'All' || prog.category === categoryFilter;
    const matchesUni = uniFilter === 'All' || prog.universityName.toLowerCase().includes(uniFilter.toLowerCase());
    const matchesQuery = 
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.curriculumHighlights.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDegree && matchesCategory && matchesUni && matchesQuery;
  });

  return (
    <div className="py-16 bg-[#f4f7fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Academic Degree Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            Explore Degree Programs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Choose from accredited Doctoral and PhD programs offered across top-ranked partner universities.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-[#00296b]/10 mb-8 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Search Keywords</label>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence, Law, MBA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:ring-[#00296b] focus:border-[#00296b] outline-none"
              />
            </div>

            {/* Degree Level Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Degree Level</label>
              <select
                value={degreeFilter}
                onChange={(e) => setDegreeFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none cursor-pointer"
              >
                <option value="All">All Doctoral Degrees</option>
                <option value="PhD">PhD</option>
                <option value="EdD">EdD</option>
                <option value="DBA">DBA</option>
                <option value="EngD">EngD</option>
                <option value="DSc / ScD">DSc / ScD</option>
                <option value="DPhil">DPhil</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Field / Faculty</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none cursor-pointer"
              >
                <option value="All">All Disciplines</option>
                <option value="Engineering & Tech">Engineering & Tech</option>
                <option value="Business & Management">Business & MBA</option>
                <option value="Medicine & Health">Medicine & Health</option>
                <option value="Law & Public Policy">Law & Policy</option>
                <option value="Arts & Humanities">Arts & Design</option>
                <option value="Natural Sciences">Natural Sciences</option>
              </select>
            </div>

            {/* University Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">University Campus</label>
              <select
                value={uniFilter}
                onChange={(e) => setUniFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none cursor-pointer"
              >
                <option value="All">All Campuses</option>
                <option value="Heritage State University">Heritage State University</option>
                <option value="Veritas Institute of Technology">Veritas Institute of Tech</option>
                <option value="St. Jude College of Health Sciences">St. Jude Health Sciences</option>
                <option value="Global Business & Economics Academy">Global Business Academy</option>
                <option value="Veritas School of Law & Public Policy">Veritas School of Law</option>
                <option value="Aura College of Creative Arts & Design">Aura College of Arts</option>
              </select>
            </div>

          </div>

          {/* Active Filter Clear & Comparison Trigger */}
          <div className="pt-2 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-500 font-medium">
              Showing <strong>{filteredPrograms.length}</strong> available degree programs
            </span>

            {comparisonList.length > 0 && (
              <button
                onClick={() => setShowComparisonModal(true)}
                className="px-4 py-2 bg-[#00296b] text-white font-bold rounded-xl shadow-md hover:bg-[#002054] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-white" />
                <span>Compare Selected Programs ({comparisonList.length}/3)</span>
              </button>
            )}
          </div>

        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((prog) => {
            const isCompared = comparisonList.some(p => p.id === prog.id);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-neutral-200/80 transition-all flex flex-col justify-between space-y-4"
              >
                
                {/* Header Badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#00296b] bg-[#00296b]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {prog.degreeLevel} • {prog.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleCompare(prog)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors border ${
                        isCompared 
                          ? 'bg-[#00296b] text-white border-[#00296b]' 
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-[#00296b]'
                      }`}
                    >
                      {isCompared ? '✓ Comparing' : '+ Compare'}
                    </button>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#001b48] leading-snug">
                    {prog.title}
                  </h3>

                  <div className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                    {(() => {
                      const uni = UNIVERSITIES?.find(u => u.id === prog.universityId || u.name === prog.universityName);
                      return uni?.logo ? (
                        <div className="w-5 h-5 rounded-full border border-neutral-300 shrink-0 overflow-hidden flex items-center justify-center p-0.5" style={{ backgroundColor: uni.logoBg || '#ffffff' }}>
                          <img 
                            src={uni.logo} 
                            alt={`${prog.universityName} Logo`} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <GraduationCap className="w-4 h-4 text-[#00296b]" />
                      );
                    })()}
                    <span>{prog.universityName}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                  {prog.description}
                </p>

                {/* Program Details Strip */}
                <div className="grid grid-cols-3 gap-2 bg-[#f4f7fa] p-3 rounded-xl border border-[#00296b]/10 text-xs">
                  <div>
                    <span className="text-neutral-500 font-medium block">Duration</span>
                    <span className="font-bold text-neutral-800">{prog.duration}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block">Annual Tuition</span>
                    <span className="font-bold text-[#00296b]">${prog.tuitionPerYear.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium block">Format</span>
                    <span className="font-bold text-neutral-800">{prog.format}</span>
                  </div>
                </div>

                {/* Curriculum Highlights Preview */}
                <div>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    Key Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.curriculumHighlights.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveProgramModal(prog)}
                    className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-[#00296b]/10 text-[#00296b] font-semibold text-xs rounded-xl transition-colors border border-[#00296b]/20 text-center cursor-pointer"
                  >
                    Curriculum & Criteria
                  </button>

                  {/* <button
                    onClick={() => onApplyToProgram(prog)}
                    className="flex-1 py-2.5 px-3 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Apply Program</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button> */}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Program Detail Modal */}
      {activeProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#00296b] bg-[#00296b]/10 px-2.5 py-0.5 rounded">
                  {activeProgramModal.degreeLevel} • {activeProgramModal.category}
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#001b48] mt-2">
                  {activeProgramModal.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {(() => {
                    const uni = UNIVERSITIES?.find(u => u.id === activeProgramModal.universityId || u.name === activeProgramModal.universityName);
                    return uni?.logo ? (
                      <div className="w-6 h-6 rounded-full border border-neutral-300 shrink-0 overflow-hidden flex items-center justify-center p-0.5" style={{ backgroundColor: uni.logoBg || '#ffffff' }}>
                        <img 
                          src={uni.logo} 
                          alt={`${activeProgramModal.universityName} Logo`} 
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    ) : null;
                  })()}
                  <p className="text-sm font-semibold text-neutral-600">
                    {activeProgramModal.universityName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveProgramModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center cursor-pointer"
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
                className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl"
              >
                Close
              </button>
              {/* <button
                onClick={() => {
                  const prog = activeProgramModal;
                  setActiveProgramModal(null);
                  onApplyToProgram(prog);
                }}
                className="px-6 py-2.5 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-xs rounded-xl shadow-md"
              >
                Apply to Program Now
              </button> */}
            </div>

          </div>
        </div>
      )}

      {/* Program Comparison Modal */}
      {showComparisonModal && comparisonList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#001b48]">
                  Side-by-Side Program Comparison
                </h3>
                <p className="text-xs text-neutral-500">
                  Comparing {comparisonList.length} selected degree programs
                </p>
              </div>

              <button
                onClick={() => setShowComparisonModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="p-3 text-xs font-bold text-neutral-500 uppercase w-1/4">Criteria</th>
                    {comparisonList.map((p) => (
                      <th key={p.id} className="p-3 text-sm font-bold text-[#00296b] font-serif w-1/4">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">University</td>
                    {comparisonList.map((p) => {
                      const uni = UNIVERSITIES?.find(u => u.id === p.universityId || u.name === p.universityName);
                      return (
                        <td key={p.id} className="p-3 font-bold text-neutral-800">
                          <div className="flex items-center gap-1.5">
                            {uni?.logo && (
                              <div className="w-5 h-5 rounded-full border border-neutral-300 shrink-0 overflow-hidden flex items-center justify-center p-0.5" style={{ backgroundColor: uni.logoBg || '#ffffff' }}>
                                <img 
                                  src={uni.logo} 
                                  alt={`${p.universityName} Logo`} 
                                  className="max-w-full max-h-full object-contain"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              </div>
                            )}
                            <span>{p.universityName}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">Degree Level</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-neutral-800">{p.degreeLevel}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">Annual Tuition</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-[#00296b]">${p.tuitionPerYear.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">Duration & Credits</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-neutral-800">{p.duration} ({p.credits} cr)</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">Format</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-neutral-800">{p.format}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-600">Deadline</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-neutral-800">{p.applicationDeadline}</td>
                    ))}
                  </tr>
                  {/* <tr>
                    <td className="p-3 font-semibold text-neutral-600">Action</td>
                    {comparisonList.map((p) => (
                      <td key={p.id} className="p-3">
                        <button
                          onClick={() => {
                            setShowComparisonModal(false);
                            onApplyToProgram(p);
                          }}
                          className="w-full py-2 bg-[#00296b] text-white text-xs font-bold rounded-lg hover:bg-[#002054]"
                        >
                          Apply Now
                        </button>
                      </td>
                    ))}
                  </tr> */}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
