"use client";

import React, { useState } from 'react';
import { 
  processSteps, 
  ProcessStep, 
  ProcessRole, 
  STAGES 
} from '../data/processData';
import { 
  UserPlus, 
  FileSignature, 
  Users, 
  MailOpen, 
  ClipboardCheck, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  UserCheck, 
  Award, 
  Target, 
  Edit3, 
  Upload, 
  FlaskConical, 
  Calendar, 
  BookMarked, 
  Presentation, 
  CheckCircle, 
  Layers, 
  HelpCircle, 
  Tv, 
  Send, 
  FileCheck, 
  MessageSquare, 
  Building2, 
  Sparkles, 
  X, 
  Clock, 
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Map role to specific Tailwind styling tokens
const ROLE_STYLES: Record<ProcessRole, { bg: string; text: string; border: string; accent: string }> = {
  'Student': { 
    bg: 'bg-blue-50 text-blue-700 border-blue-200', 
    text: 'text-blue-700',
    border: 'border-blue-300',
    accent: 'bg-blue-600'
  },
  'Admission Office': { 
    bg: 'bg-teal-50 text-teal-700 border-teal-200', 
    text: 'text-teal-700',
    border: 'border-teal-300',
    accent: 'bg-teal-600'
  },
  'University': { 
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    accent: 'bg-emerald-600'
  },
  'Supervisor / Guide': { 
    bg: 'bg-amber-50 text-amber-700 border-amber-200', 
    text: 'text-amber-700',
    border: 'border-amber-300',
    accent: 'bg-amber-600'
  },
  'RDC': { 
    bg: 'bg-purple-50 text-purple-700 border-purple-200', 
    text: 'text-purple-700',
    border: 'border-purple-300',
    accent: 'bg-purple-600'
  },
  'External Examiner': { 
    bg: 'bg-rose-50 text-rose-700 border-rose-200', 
    text: 'text-rose-700',
    border: 'border-rose-300',
    accent: 'bg-rose-600'
  },
  'Academic Council': { 
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    accent: 'bg-indigo-600'
  },
  'Examination Branch': { 
    bg: 'bg-sky-50 text-sky-700 border-sky-200', 
    text: 'text-sky-700',
    border: 'border-sky-300',
    accent: 'bg-sky-600'
  }
};

// Map step index to custom icons
const getStepIcon = (num: number) => {
  switch (num) {
    case 1: return UserPlus;
    case 2: return FileSignature;
    case 3: return Users;
    case 4: return MailOpen;
    case 5: return ClipboardCheck;
    case 6: return BookOpen;
    case 7: return FileText;
    case 8: return GraduationCap;
    case 9: return UserCheck;
    case 10: return Award;
    case 11: return Target;
    case 12: return Edit3;
    case 13: return Upload;
    case 14: return FlaskConical;
    case 15: return Calendar;
    case 16: return BookMarked;
    case 17: return Presentation;
    case 18: return CheckCircle;
    case 19: return Layers;
    case 20: return HelpCircle;
    case 21: return Tv;
    case 22: return Send;
    case 23: return FileCheck;
    case 24: return MessageSquare;
    case 25: return Building2;
    case 26: return GraduationCap;
    case 27: return Award;
    default: return Sparkles;
  }
};

export const ProcessFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [viewMode, setViewMode] = useState<'snake' | 'timeline'>('snake');

  // Group steps for the snake grid (4 steps per row)
  const getSnakeGridMatrix = () => {
    const matrix: (ProcessStep | 'END' | null)[][] = [];
    
    // Row 0: 1, 2, 3, 4
    matrix.push([
      processSteps[0],
      processSteps[1],
      processSteps[2],
      processSteps[3]
    ]);

    // Row 1: 8, 7, 6, 5
    matrix.push([
      processSteps[7],
      processSteps[6],
      processSteps[5],
      processSteps[4]
    ]);

    // Row 2: 9, 10, 11, 12
    matrix.push([
      processSteps[8],
      processSteps[9],
      processSteps[10],
      processSteps[11]
    ]);

    // Row 3: 16, 15, 14, 13
    matrix.push([
      processSteps[15],
      processSteps[14],
      processSteps[13],
      processSteps[12]
    ]);

    // Row 4: 17, 18, 19, 20
    matrix.push([
      processSteps[16],
      processSteps[17],
      processSteps[18],
      processSteps[19]
    ]);

    // Row 5: 24, 23, 22, 21
    matrix.push([
      processSteps[23],
      processSteps[22],
      processSteps[21],
      processSteps[20]
    ]);

    // Row 6: 25, 26, 27, END
    matrix.push([
      processSteps[24],
      processSteps[25],
      processSteps[26],
      'END'
    ]);

    return matrix;
  };

  const gridMatrix = getSnakeGridMatrix();

  return (
    <div className="py-12 bg-[#f4f7fa] min-h-screen selection:bg-[#00296b] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Admissions & Academic Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            Research Degree Process Flow
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            A comprehensive overview outlining the 27 milestone stages from initial registration to the final conferral of your research degree. Click on any step to view its deliverables, prerequisites, and detailed guidelines.
          </p>

          {/* Layout Toggle */}
          <div className="bg-neutral-200/60 p-1 rounded-xl border border-neutral-300/40 flex gap-1 mt-6">
            <button
              onClick={() => setViewMode('snake')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'snake'
                  ? 'bg-white text-[#00296b] shadow-xs'
                  : 'text-neutral-600 hover:text-[#00296b]'
              }`}
            >
              Snake Flow View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-[#00296b] shadow-xs'
                  : 'text-neutral-600 hover:text-[#00296b]'
              }`}
            >
              Vertical Timeline View
            </button>
          </div>
        </div>

        {/* Phase Legend Info Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 text-center sm:text-left">
            Role Responsibility Color Guide
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            {Object.keys(ROLE_STYLES).map((role) => {
              const rStyle = ROLE_STYLES[role as ProcessRole];
              return (
                <span 
                  key={role}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border ${rStyle.bg}`}
                >
                  {role}
                </span>
              );
            })}
          </div>
        </div>

        {/* MAIN VISUAL ROADMAP GRID */}
        <div>
          {viewMode === 'snake' ? (
            /* DESKTOP SNAKE VIEW - ONLY VISIBLE ON LARGE SCREENS */
            <div className="hidden lg:block space-y-12 pb-16">
              
              <div className="relative">
                <div className="grid grid-cols-4 gap-x-8 gap-y-16 relative z-10">
                  {gridMatrix.map((row, rowIndex) => {
                    const isRowOdd = rowIndex % 2 !== 0; // Odd rows render right-to-left
                    
                    return row.map((cell, colIndex) => {
                      if (cell === null) {
                        return <div key={`empty-${rowIndex}-${colIndex}`} />;
                      }

                      if (cell === 'END') {
                        return (
                          <div 
                            key="step-end"
                            className="bg-gradient-to-br from-[#001b48] to-[#00296b] border-2 border-[#e8c47a] rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center text-center space-y-4 h-full min-h-[190px] text-white"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                              <GraduationCap className="w-6 h-6 text-[#e8c47a]" />
                            </div>
                            <h3 className="font-serif font-black text-xl tracking-widest text-[#e8c47a]">
                              DEGREE CONFERRED
                            </h3>
                            <p className="text-[9px] uppercase font-bold text-white/60">
                              End of Process
                            </p>
                          </div>
                        );
                      }

                      const rStyle = ROLE_STYLES[cell.role];
                      const IconComponent = getStepIcon(cell.number);

                      return (
                        <div 
                          key={`step-${cell.number}`}
                          onClick={() => setSelectedStep(cell)}
                          className="relative rounded-3xl bg-white border-2 border-neutral-200/80 p-5 shadow-xs hover:border-[#00296b] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[190px] group cursor-pointer"
                        >
                          {/* Top Card Row */}
                          <div className="flex justify-between items-start gap-2">
                            {/* Step Number Circle */}
                            <div className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center shrink-0 shadow-inner ${rStyle.accent} text-white`}>
                              {cell.number}
                            </div>
                            
                            {/* Icon for the step action */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${rStyle.bg} border-transparent`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Step Content */}
                          <div className="my-3 space-y-1">
                            <h4 className="font-bold text-sm text-[#001b48] leading-snug group-hover:text-[#00296b] transition-colors">
                              {cell.title}
                            </h4>
                            <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                              {cell.description}
                            </p>
                          </div>

                          {/* Role Badge and arrow guides */}
                          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between mt-auto">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rStyle.bg}`}>
                              {cell.role}
                            </span>
                            <span className="text-[10px] font-semibold text-neutral-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              {cell.duration.split(' ')[0]} {cell.duration.split(' ')[1] || ''}
                            </span>
                          </div>

                          {/* Horizontal Arrow lines between steps on Desktop */}
                          {colIndex < 3 && !isRowOdd && (
                            <div className="absolute left-[102%] top-[50%] w-[12%] h-[2px] bg-neutral-300 -translate-y-1/2 -z-10 pointer-events-none">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-neutral-400 rotate-45" />
                            </div>
                          )}
                          {colIndex > 0 && isRowOdd && (
                            <div className="absolute right-[102%] top-[50%] w-[12%] h-[2px] bg-neutral-300 -translate-y-1/2 -z-10 pointer-events-none">
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-b-2 border-l-2 border-neutral-400 rotate-45" />
                            </div>
                          )}

                          {/* Vertical Down Arrow lines at the end of rows */}
                          {colIndex === 3 && !isRowOdd && rowIndex < 6 && (
                            <div className="absolute left-[50%] top-[102%] w-[2px] h-[34px] bg-neutral-300 -translate-x-1/2 -z-10 pointer-events-none">
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b-2 border-r-2 border-neutral-400 rotate-45" />
                            </div>
                          )}
                          {colIndex === 0 && isRowOdd && rowIndex < 6 && (
                            <div className="absolute left-[50%] top-[102%] w-[2px] h-[34px] bg-neutral-300 -translate-x-1/2 -z-10 pointer-events-none">
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b-2 border-r-2 border-neutral-400 rotate-45" />
                            </div>
                          )}

                        </div>
                      );
                    });
                  })}
                </div>
              </div>

            </div>
          ) : null}

          {/* TIMELINE VIEW (Also fallback view for Mobile/Tablet) */}
          <div className={`${viewMode === 'snake' ? 'lg:hidden' : ''} space-y-6`}>
            
            <div className="relative border-l-2 border-[#00296b]/20 ml-5 sm:ml-8 pl-6 sm:pl-10 space-y-8 py-2">
              
              {processSteps.map((step) => {
                const rStyle = ROLE_STYLES[step.role];
                const IconComponent = getStepIcon(step.number);

                return (
                  <div 
                    key={`timeline-step-${step.number}`}
                    onClick={() => setSelectedStep(step)}
                    className="relative group cursor-pointer"
                  >
                    {/* Node Dot / Timeline Indicator */}
                    <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-white border-[#00296b] text-[#00296b] group-hover:bg-[#00296b] group-hover:text-white flex items-center justify-center transition-all">
                        <span className="text-xs sm:text-sm font-black font-serif">{step.number}</span>
                      </div>
                    </div>

                    {/* Step Card Body */}
                    <div className="bg-white rounded-2xl border border-neutral-200 hover:border-[#00296b] p-5 shadow-xs hover:shadow-md hover:translate-x-1 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* Action Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${rStyle.bg}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <div className="space-y-1 text-left">
                            <h4 className="font-black text-base text-[#001b48] group-hover:text-[#00296b]">
                              {step.title}
                            </h4>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                              Phase: {step.stage}
                            </span>
                            <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed pt-1.5">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Meta Tags */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100 shrink-0 gap-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${rStyle.bg}`}>
                            {step.role}
                          </span>
                          <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 border border-neutral-200 px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>

      </div>

      {/* DETAIL SIDE PANEL (DRAWER / OVERLAY) */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-over Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-neutral-200"
            >
              
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#001b48] to-[#00296b] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8c47a] text-[#00296b] flex items-center justify-center font-serif font-black text-lg">
                    {selectedStep.number}
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[#e8c47a] uppercase tracking-widest">
                      Workflow Milestone
                    </span>
                    <h3 className="text-lg font-bold font-serif leading-tight">
                      {selectedStep.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStep(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 text-left">
                
                {/* Primary Metadata Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      Responsible Actor
                    </span>
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border ${ROLE_STYLES[selectedStep.role].bg}`}>
                      {selectedStep.role}
                    </span>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      Timeline / Duration
                    </span>
                    <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {selectedStep.duration}
                    </span>
                  </div>
                </div>

                {/* Detailed description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Process Description
                  </h4>
                  <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50/50 p-4 rounded-xl border border-neutral-200/50">
                    {selectedStep.description}
                  </p>
                </div>

                {/* Prerequisites & Deliverables */}
                <div className="space-y-4 pt-2">
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>Required Prerequisites</span>
                    </h4>
                    <p className="text-xs text-neutral-600 bg-rose-50/20 border border-rose-100 p-4 rounded-xl leading-relaxed">
                      {selectedStep.prerequisite}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Key Outputs / Deliverables</span>
                    </h4>
                    <p className="text-xs text-neutral-600 bg-emerald-50/20 border border-emerald-100 p-4 rounded-xl leading-relaxed font-semibold">
                      {selectedStep.deliverable}
                    </p>
                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  Phase: {selectedStep.stage}
                </span>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="px-5 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
