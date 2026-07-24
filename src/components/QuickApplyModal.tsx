"use client";

import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { X, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUniversity?: string;
  onSubmittedSuccess: (id: string) => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultUniversity,
  onSubmittedSuccess 
}) => {
  const { universities: UNIVERSITIES, programs: PROGRAMS, loading } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedProg, setSelectedProg] = useState('');
  const [gpa, setGpa] = useState('3.85');

  useEffect(() => {
    if (!loading && UNIVERSITIES.length > 0 && !selectedUni) {
      setSelectedUni(defaultUniversity || UNIVERSITIES[0].name);
    }
  }, [loading, UNIVERSITIES, defaultUniversity, selectedUni]);

  useEffect(() => {
    if (!loading && PROGRAMS.length > 0 && !selectedProg) {
      setSelectedProg(PROGRAMS[0].title);
    }
  }, [loading, PROGRAMS, selectedProg]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    onSubmittedSuccess(generatedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-5 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00296b] text-white flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-[#001b48]">
              Quick Admissions Application
            </h3>
            <p className="text-xs text-neutral-500">
              Start your Fall 2026 application in 60 seconds
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-neutral-800">
          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Taylor Reed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="taylor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">Target University *</label>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
            >
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">Degree Program *</label>
            <select
              value={selectedProg}
              onChange={(e) => setSelectedProg(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
            >
              {PROGRAMS.map(p => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">Current GPA *</label>
            <input
              type="text"
              required
              placeholder="3.85"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Submit Application Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

      </div>
    </div>
  );
};
