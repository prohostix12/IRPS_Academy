"use client";

import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { INITIAL_APPLICATIONS } from '../data/universityData';
import { ApplicationRecord, Program } from '../types';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock, 
  Calculator, 
  Upload, 
  ArrowRight, 
  UserCheck, 
  GraduationCap, 
  Award, 
  AlertCircle,
  FileCheck,
  Building,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AdmissionsPortalProps {
  preselectedProgram?: Program | null;
  preselectedUniversity?: string;
}

export const AdmissionsPortal: React.FC<AdmissionsPortalProps> = ({ 
  preselectedProgram,
  preselectedUniversity
}) => {
  const { universities: UNIVERSITIES, programs: PROGRAMS, loading } = useData();
  const [activeSubTab, setActiveSubTab] = useState<'apply' | 'track' | 'calculator'>('apply');

  // Application Wizard State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    universityName: preselectedUniversity || '',
    programTitle: preselectedProgram ? preselectedProgram.title : '',
    degreeLevel: preselectedProgram ? preselectedProgram.degreeLevel : 'PhD',
    gpa: '3.80',
    satGreScore: '1450',
    statementOfPurpose: '',
    hasUploadedTranscripts: true,
    hasUploadedRecommendation: true,
  });

  useEffect(() => {
    if (!loading && UNIVERSITIES.length > 0 && !formData.universityName) {
      setFormData(prev => ({ 
        ...prev, 
        universityName: preselectedUniversity || (preselectedProgram ? preselectedProgram.universityName : UNIVERSITIES[0].name)
      }));
    }
  }, [loading, UNIVERSITIES, preselectedUniversity, preselectedProgram, formData.universityName]);

  useEffect(() => {
    if (!loading && PROGRAMS.length > 0 && !formData.programTitle) {
      setFormData(prev => ({ 
        ...prev, 
        programTitle: preselectedProgram ? preselectedProgram.title : PROGRAMS[0].title
      }));
    }
  }, [loading, PROGRAMS, preselectedProgram, formData.programTitle]);

  const [applicationsList, setApplicationsList] = useState<ApplicationRecord[]>(INITIAL_APPLICATIONS);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Application Status Tracker State
  const [searchTrackingId, setSearchTrackingId] = useState<string>('');
  const [trackedRecord, setTrackedRecord] = useState<ApplicationRecord | null>(INITIAL_APPLICATIONS[0]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Scholarship Calculator State
  const [calcGpa, setCalcGpa] = useState<number>(3.75);
  const [calcScore, setCalcScore] = useState<number>(1400); // SAT or GRE equivalent
  const [calcActivities, setCalcActivities] = useState<string>('High');
  const [calcIncome, setCalcIncome] = useState<string>('Tier2');

  const calculateScholarship = () => {
    let scorePoints = 0;
    if (calcGpa >= 3.8) scorePoints += 40;
    else if (calcGpa >= 3.5) scorePoints += 30;
    else scorePoints += 20;

    if (calcScore >= 1480) scorePoints += 40;
    else if (calcScore >= 1350) scorePoints += 30;
    else scorePoints += 15;

    if (calcActivities === 'Exceptional') scorePoints += 20;
    else if (calcActivities === 'High') scorePoints += 10;

    if (scorePoints >= 90) return { percent: '100% Full Tuition Grant', award: '$28,000 / year', title: 'Presidential Merit Fellowship' };
    if (scorePoints >= 75) return { percent: '75% Tuition Grant', award: '$21,000 / year', title: 'Dean\'s Academic Distinction Grant' };
    if (scorePoints >= 55) return { percent: '50% Tuition Grant', award: '$14,000 / year', title: 'Global Excellence Scholarship' };
    return { percent: '25% Tuition Grant', award: '$7,000 / year', title: 'Opportunity Access Grant' };
  };

  const currentCalcResult = calculateScholarship();

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newRecord: ApplicationRecord = {
      id: newId,
      applicantName: formData.applicantName || 'Alex Mercer',
      email: formData.email || 'alex.mercer@example.com',
      phone: formData.phone || '+1 (555) 321-7654',
      universityName: formData.universityName,
      programTitle: formData.programTitle,
      degreeLevel: formData.degreeLevel,
      gpa: formData.gpa,
      status: 'Received',
      appliedDate: new Date().toISOString().split('T')[0],
      documentsUploaded: ['Academic_Transcripts.pdf', 'Statement_of_Purpose.pdf', 'Recommendation_Letters.pdf'],
      notes: 'Application successfully logged. Initial document verification in progress.'
    };

    setApplicationsList([newRecord, ...applicationsList]);
    setSubmittedAppId(newId);
    setTrackedRecord(newRecord);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const found = applicationsList.find(a => a.id.toLowerCase() === searchTrackingId.trim().toLowerCase());
    if (found) {
      setTrackedRecord(found);
    } else {
      setSearchError(`No application record found for ID "${searchTrackingId}". Please verify your tracking code.`);
    }
  };

  return (
    <div className="py-16 bg-[#f4f7fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Official Admissions Portal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            Apply & Track Admissions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Submit your university application online, track real-time decision status, or estimate your financial aid and scholarship grant eligibility.
          </p>
        </div>

        {/* Portal Nav Subtabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl shadow-md border border-[#00296b]/15 flex flex-wrap gap-1 max-w-2xl w-full">
            <button
              onClick={() => setActiveSubTab('apply')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeSubTab === 'apply'
                  ? 'bg-[#00296b] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-[#00296b] hover:bg-[#00296b]/10'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Online Application</span>
            </button>

            <button
              onClick={() => setActiveSubTab('track')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeSubTab === 'track'
                  ? 'bg-[#00296b] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-[#00296b] hover:bg-[#00296b]/10'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Status Tracker</span>
            </button>

            <button
              onClick={() => setActiveSubTab('calculator')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeSubTab === 'calculator'
                  ? 'bg-[#00296b] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-[#00296b] hover:bg-[#00296b]/10'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Scholarship Calculator</span>
            </button>
          </div>
        </div>

        {/* 1. ONLINE APPLICATION WIZARD */}
        {activeSubTab === 'apply' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200">
            
            {submittedAppId ? (
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold font-serif text-[#001b48]">
                  Application Successfully Submitted!
                </h3>
                <div className="text-sm text-neutral-600 max-w-md mx-auto flex items-center justify-center gap-2 flex-wrap">
                  {(() => {
                    const uni = UNIVERSITIES.find(u => u.name === formData.universityName);
                    return uni?.logo ? (
                      <img 
                        src={uni.logo} 
                        alt={`${formData.universityName} Logo`} 
                        className="w-6 h-6 rounded-full object-cover bg-neutral-100 p-0.5 border border-neutral-300 shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : null;
                  })()}
                  <span>Your application to <strong>{formData.universityName}</strong> for <strong>{formData.programTitle}</strong> has been logged in our central admissions portal.</span>
                </div>

                <div className="bg-[#f4f7fa] p-6 rounded-2xl border border-[#00296b]/20 max-w-sm mx-auto">
                  <span className="text-xs font-bold text-neutral-500 uppercase block mb-1">Your Tracking Reference ID</span>
                  <span className="text-2xl font-black text-[#00296b] font-mono tracking-wider">{submittedAppId}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSearchTrackingId(submittedAppId);
                      setActiveSubTab('track');
                    }}
                    className="px-6 py-3 bg-[#00296b] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#002054]"
                  >
                    Track Status Now
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedAppId(null);
                      setWizardStep(1);
                    }}
                    className="px-6 py-3 bg-neutral-100 text-neutral-700 font-bold text-sm rounded-xl hover:bg-neutral-200"
                  >
                    Start Another Application
                  </button>
                </div>
              </div>
            ) : (
              <div>
                
                {/* Wizard Step Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500 mb-2">
                    <span className={wizardStep >= 1 ? 'text-[#00296b]' : ''}>1. Applicant Profile</span>
                    <span className={wizardStep >= 2 ? 'text-[#00296b]' : ''}>2. University & Program</span>
                    <span className={wizardStep >= 3 ? 'text-[#00296b]' : ''}>3. Academics & Docs</span>
                    <span className={wizardStep >= 4 ? 'text-[#00296b]' : ''}>4. Review & Submit</span>
                  </div>

                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#00296b] h-full transition-all duration-300"
                      style={{ width: `${(wizardStep / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleApplicationSubmit}>
                  
                  {/* Step 1: Applicant Info */}
                  {wizardStep === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="text-xl font-bold font-serif text-[#001b48] border-b border-neutral-200 pb-2">
                        Step 1: Personal & Contact Profile
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Mercer"
                            value={formData.applicantName}
                            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. alex.mercer@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Citizenship / Residency Status</label>
                          <select className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none">
                            <option>Domestic Student</option>
                            <option>International Student (Requires F-1 Visa)</option>
                            <option>Permanent Resident</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="px-6 py-3 bg-[#00296b] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#002054] flex items-center gap-2"
                        >
                          <span>Next: Choose Program</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: University & Program */}
                  {wizardStep === 2 && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="text-xl font-bold font-serif text-[#001b48] border-b border-neutral-200 pb-2">
                        Step 2: Target University & Degree
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Select University Campus *</label>
                          <select
                            value={formData.universityName}
                            onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none cursor-pointer"
                          >
                            {UNIVERSITIES.map(u => (
                              <option key={u.id} value={u.name}>{u.name} ({u.location})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Select Degree Program *</label>
                          <select
                            value={formData.programTitle}
                            onChange={(e) => {
                              const title = e.target.value;
                              const p = PROGRAMS.find(item => item.title === title);
                              setFormData({
                                ...formData,
                                programTitle: title,
                                degreeLevel: p ? p.degreeLevel : 'PhD'
                              });
                            }}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none cursor-pointer"
                          >
                            {PROGRAMS.map(p => (
                              <option key={p.id} value={p.title}>{p.title} ({p.degreeLevel})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="p-4 bg-[#f4f7fa] rounded-xl border border-[#00296b]/10 text-xs text-neutral-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#00296b] block">Selected Degree Tier:</span>
                          <span>{formData.degreeLevel} Degree</span>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded font-bold">
                          Fall 2026 Intake Available
                        </span>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="px-6 py-3 bg-neutral-100 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-200"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setWizardStep(3)}
                          className="px-6 py-3 bg-[#00296b] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#002054] flex items-center gap-2"
                        >
                          <span>Next: Academic Documents</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Academics & Documents */}
                  {wizardStep === 3 && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="text-xl font-bold font-serif text-[#001b48] border-b border-neutral-200 pb-2">
                        Step 3: Academic Records & Document Checklist
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Cumulative GPA (4.0 Scale) *</label>
                          <input
                            type="text"
                            value={formData.gpa}
                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">SAT / GRE / GMAT Test Score</label>
                          <input
                            type="text"
                            value={formData.satGreScore}
                            onChange={(e) => setFormData({ ...formData, satGreScore: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                          />
                        </div>
                      </div>

                      {/* File Upload Simulator */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-neutral-700 uppercase">Document Checklist</label>

                        <div className="p-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-[#00296b]" />
                            <div>
                              <p className="text-xs font-bold text-neutral-800">Official High School / University Transcripts</p>
                              <p className="text-[11px] text-neutral-500">Academic_Transcripts_Final.pdf (1.8 MB)</p>
                            </div>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded font-bold">Attached</span>
                        </div>

                        <div className="p-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-[#00296b]" />
                            <div>
                              <p className="text-xs font-bold text-neutral-800">Statement of Purpose (SOP) & Essay</p>
                              <p className="text-[11px] text-neutral-500">Personal_Statement_2026.pdf (850 KB)</p>
                            </div>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded font-bold">Attached</span>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="px-6 py-3 bg-neutral-100 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-200"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setWizardStep(4)}
                          className="px-6 py-3 bg-[#00296b] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#002054] flex items-center gap-2"
                        >
                          <span>Next: Final Review</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Final Review & Submit */}
                  {wizardStep === 4 && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="text-xl font-bold font-serif text-[#001b48] border-b border-neutral-200 pb-2">
                        Step 4: Application Summary Review
                      </h3>

                      <div className="bg-[#f4f7fa] rounded-2xl p-5 border border-[#00296b]/20 space-y-3 text-xs text-neutral-800">
                        <div className="flex justify-between border-b border-neutral-200 pb-2">
                          <span className="font-semibold text-neutral-500">Applicant Name:</span>
                          <span className="font-bold">{formData.applicantName || 'Alex Mercer'}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-200 pb-2">
                          <span className="font-semibold text-neutral-500">Email:</span>
                          <span className="font-bold">{formData.email || 'alex.mercer@example.com'}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-200 pb-2 items-center">
                          <span className="font-semibold text-neutral-500">Target University:</span>
                          <div className="flex items-center gap-1.5">
                            {(() => {
                              const uni = UNIVERSITIES.find(u => u.name === formData.universityName);
                              return uni?.logo ? (
                                <img 
                                  src={uni.logo} 
                                  alt={`${formData.universityName} Logo`} 
                                  className="w-5 h-5 rounded-full object-cover bg-white p-0.5 border border-neutral-200 shrink-0"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : null;
                            })()}
                            <span className="font-bold text-[#00296b]">{formData.universityName}</span>
                          </div>
                        </div>
                        <div className="flex justify-between border-b border-neutral-200 pb-2">
                          <span className="font-semibold text-neutral-500">Target Program:</span>
                          <span className="font-bold text-[#00296b]">{formData.programTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-neutral-500">Academic Score:</span>
                          <span className="font-bold">GPA {formData.gpa} • Test {formData.satGreScore}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                        <span>By clicking "Submit Official Application", you certify that all submitted transcripts and academic details are authentic.</span>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(3)}
                          className="px-6 py-3 bg-neutral-100 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-200"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3.5 bg-[#00296b] text-white font-bold text-sm rounded-xl shadow-lg hover:bg-[#002054] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Submit Official Application</span>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            )}

          </div>
        )}

        {/* 2. APPLICATION STATUS TRACKER */}
        {activeSubTab === 'track' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Search Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200">
              <h3 className="text-xl font-bold font-serif text-[#001b48] mb-2">
                Real-Time Application Status Check
              </h3>
              <p className="text-xs text-neutral-600 mb-4">
                Enter your 12-digit application reference code (e.g., ADM-2026-8842 or ADM-2026-9120) to check evaluation progress.
              </p>

              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. ADM-2026-8842"
                  value={searchTrackingId}
                  onChange={(e) => setSearchTrackingId(e.target.value)}
                  className="flex-grow bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm font-mono font-bold text-neutral-800 focus:ring-2 focus:ring-[#00296b] outline-none"
                />
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Track Status</span>
                </button>
              </form>

              {searchError && (
                <p className="mt-3 text-xs font-semibold text-red-600 bg-blue-50/50 p-3 rounded-lg border border-red-200">
                  {searchError}
                </p>
              )}
            </div>

            {/* Display Tracked Record */}
            {trackedRecord && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200 space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-500">APPLICATION REF: {trackedRecord.id}</span>
                    <h4 className="text-2xl font-bold font-serif text-[#001b48] mt-0.5">
                      {trackedRecord.applicantName}
                    </h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      Applied on {trackedRecord.appliedDate}
                    </p>
                  </div>

                  <span className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    trackedRecord.status === 'Accepted' || trackedRecord.status === 'Scholarship Awarded'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {trackedRecord.status}
                  </span>
                </div>

                {/* Target Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f4f7fa] p-4 rounded-2xl border border-[#00296b]/10 text-xs">
                  <div>
                    <span className="text-neutral-500 block font-medium mb-1">University</span>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const uni = UNIVERSITIES.find(u => u.name === trackedRecord.universityName);
                        return uni?.logo ? (
                          <img 
                            src={uni.logo} 
                            alt={`${trackedRecord.universityName} Logo`} 
                            className="w-6 h-6 rounded-full object-cover bg-white p-0.5 border border-neutral-300 shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : null;
                      })()}
                      <span className="font-bold text-[#00296b] text-sm">{trackedRecord.universityName}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-medium">Program</span>
                    <span className="font-bold text-[#00296b] text-sm">{trackedRecord.programTitle}</span>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div>
                  <h5 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-4">
                    Evaluation Progress Timeline
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                    
                    <div className="p-3 bg-green-50 rounded-xl border border-green-200 font-bold text-green-800 space-y-1">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-green-600" />
                      <span>1. Received</span>
                    </div>

                    <div className="p-3 bg-green-50 rounded-xl border border-green-200 font-bold text-green-800 space-y-1">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-green-600" />
                      <span>2. Documents Verified</span>
                    </div>

                    <div className={`p-3 rounded-xl border font-bold space-y-1 ${
                      trackedRecord.status === 'Interview Scheduled' || trackedRecord.status === 'Accepted'
                        ? 'bg-green-50 text-green-800 border-green-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      <Clock className="w-5 h-5 mx-auto text-amber-600" />
                      <span>3. Committee Review</span>
                    </div>

                    <div className={`p-3 rounded-xl border font-bold space-y-1 ${
                      trackedRecord.status === 'Accepted'
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : 'bg-neutral-100 text-neutral-400 border-neutral-200'
                    }`}>
                      <Award className="w-5 h-5 mx-auto text-[#00296b]" />
                      <span>4. Decision Issued</span>
                    </div>

                  </div>
                </div>

                {/* Notes */}
                {trackedRecord.notes && (
                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong>Admissions Office Note:</strong> {trackedRecord.notes}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* 3. SCHOLARSHIP CALCULATOR */}
        {activeSubTab === 'calculator' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200 animate-fadeIn space-y-8">
            
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="text-2xl font-bold font-serif text-[#001b48] flex items-center gap-2">
                <Calculator className="w-6 h-6 text-[#00296b]" />
                <span>Scholarship & Financial Aid Calculator</span>
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Estimate your merit fellowship based on master's or undergraduate GPA, standardized test scores, and research/leadership achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Calculator Inputs */}
              <div className="space-y-5">
                
                {/* GPA Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                    <span>Cumulative GPA:</span>
                    <span className="text-[#00296b] text-sm">{calcGpa.toFixed(2)} / 4.0</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="4.0"
                    step="0.05"
                    value={calcGpa}
                    onChange={(e) => setCalcGpa(parseFloat(e.target.value))}
                    className="w-full accent-[#00296b] cursor-pointer"
                  />
                </div>

                {/* Test Score Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                    <span>SAT / GRE Equivalent:</span>
                    <span className="text-[#00296b] text-sm">{calcScore} Points</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1600"
                    step="20"
                    value={calcScore}
                    onChange={(e) => setCalcScore(parseInt(e.target.value))}
                    className="w-full accent-[#00296b] cursor-pointer"
                  />
                </div>

                {/* Activities Level */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Extracurricular Leadership</label>
                  <select
                    value={calcActivities}
                    onChange={(e) => setCalcActivities(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-neutral-800 outline-none"
                  >
                    <option value="Exceptional">National Olympiad / Student Council President</option>
                    <option value="High">Varsity Athlete / Community Founder</option>
                    <option value="Moderate">Active Club Member</option>
                  </select>
                </div>

              </div>

              {/* Calculated Result Card */}
              <div className="bg-gradient-to-br from-[#00296b] to-[#001b48] text-white p-8 rounded-2xl shadow-xl text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-24 h-24 text-white" />
                </div>

                <span className="text-xs uppercase tracking-widest text-amber-200 font-bold bg-white/10 px-3 py-1 rounded-full inline-block">
                  Estimated Grant Award
                </span>

                <div className="text-3xl sm:text-4xl font-black font-serif text-white">
                  {currentCalcResult.percent}
                </div>

                <div className="text-xl font-bold text-amber-200 font-mono">
                  Approx. {currentCalcResult.award}
                </div>

                <p className="text-xs text-blue-100/90 font-medium">
                  Grant Scheme: <strong>{currentCalcResult.title}</strong>
                </p>

                <button
                  onClick={() => setActiveSubTab('apply')}
                  className="mt-2 w-full py-3 bg-white text-[#00296b] font-bold text-xs rounded-xl shadow-md hover:bg-blue-50/50 transition-colors"
                >
                  Apply to Claim Scholarship
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
