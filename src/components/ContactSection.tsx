"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { FAQS } from '../data/universityData';
import { useData } from '../context/DataContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  Building2 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { universities, programs } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('Admissions');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Admissions Inquiry',
    campus: '',
    program: '',
    message: ''
  });

  const availablePrograms = useMemo(() => {
    return programs.filter(prog => 
      !form.campus || prog.universityName.toLowerCase() === form.campus.toLowerCase()
    );
  }, [programs, form.campus]);

  useEffect(() => {
    if (universities.length > 0 && !form.campus) {
      setForm(prev => ({ ...prev, campus: universities[0].name }));
    }
  }, [universities, form.campus]);

  useEffect(() => {
    if (availablePrograms.length > 0) {
      if (!availablePrograms.some(p => p.title === form.program)) {
        setForm(prev => ({ ...prev, program: availablePrograms[0].title }));
      }
    } else {
      if (form.program !== '') {
        setForm(prev => ({ ...prev, program: '' }));
      }
    }
  }, [availablePrograms, form.program]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFaqs = FAQS.filter(f => f.category === activeFaqCategory);

  return (
    <div className="py-16 bg-[#f4f7fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00296b]/10 text-[#00296b] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#00296b]" />
            <span>Admissions Support</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#001b48] tracking-tight">
            Contact Admissions & Help Desk
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Have questions about degree requirements, scholarship grants, or application deadlines? Our admissions counselors are available 24/7.
          </p>
        </div>

        {/* Contact Form & Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#001b48]">Inquiry Received!</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you for reaching out to Veritas Admissions. An admissions representative will respond to <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#00296b] text-white text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-[#001b48] border-b border-neutral-200 pb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Inquiry Category</label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                    >
                      <option>Admissions Inquiry</option>
                      <option>Scholarships & Financial Aid</option>
                      <option>International Visa (F-1) Support</option>
                      <option>Campus Visit Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Target Campus</label>
                    <select
                      value={form.campus}
                      onChange={(e) => setForm({ ...form, campus: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                    >
                      {universities.map((uni) => (
                        <option key={uni.id} value={uni.name}>
                          {uni.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Target Program</label>
                    <select
                      value={form.program}
                      onChange={(e) => setForm({ ...form, program: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                    >
                      <option value="">General / No Specific Program</option>
                      {availablePrograms.map((prog) => (
                        <option key={prog.id} value={prog.title}>
                          {prog.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Your Question or Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your question regarding admission requirements or scholarships..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry to Counselors'}</span>
                </button>
              </form>
            )}

          </div>

          {/* Directory & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200 space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#001b48]">
                Central Admissions Office
              </h3>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-3 p-3 bg-[#f4f7fa] rounded-xl border border-[#00296b]/10">
                  <MapPin className="w-5 h-5 text-[#00296b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Main Campus Address</strong>
                    <span>100 University Boulevard, Cambridge, MA 02138, USA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f4f7fa] rounded-xl border border-[#00296b]/10">
                  <Phone className="w-5 h-5 text-[#00296b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Toll-Free Admissions Hotline</strong>
                    <span>+1 (800) 555-UNIV / +1 (617) 555-0199</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f4f7fa] rounded-xl border border-[#00296b]/10">
                  <Mail className="w-5 h-5 text-[#00296b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Official Admissions Email</strong>
                    <span>admissions@veritasportal.edu</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f4f7fa] rounded-xl border border-[#00296b]/10">
                  <Clock className="w-5 h-5 text-[#00296b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Office Working Hours</strong>
                    <span>Monday – Friday: 8:00 AM – 6:00 PM EST</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-200 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-serif text-[#001b48]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Find quick answers to common questions about admissions, financial aid, and student visas.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {['Admissions', 'Scholarships', 'International Students', 'Campus Life'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFaqCategory === cat
                    ? 'bg-[#00296b] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-[#00296b]/10 hover:text-[#00296b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50/50">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left font-bold text-sm text-[#001b48] flex items-center justify-between hover:bg-[#00296b]/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#00296b] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
