"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmittedSuccess?: () => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmittedSuccess 
}) => {
  const { universities } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Admissions Inquiry');
  const [campus, setCampus] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Reset form states when modal is opened
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setInquiryType('Admissions Inquiry');
      setCampus(universities[0]?.name || '');
      setMessage('');
      setSubmitted(false);
      setSubmitError(null);
    }
  }, [isOpen, universities]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name,
      email,
      phone,
      inquiryType,
      campus,
      message
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
      if (onSubmittedSuccess) {
        onSubmittedSuccess();
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto pt-10 sm:pt-16 md:pt-20 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-5 relative my-8 animate-slideDown">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#001b48]">Inquiry Received!</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Thank you for reaching out to Veritas Admissions. An admissions representative will respond to <strong>{email}</strong> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#00296b] hover:bg-[#002054] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#00296b] text-white flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#001b48]">
                  Start Application Online
                </h3>
                <p className="text-xs text-neutral-500">
                  Send an inquiry to start your application process
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-neutral-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
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
                    placeholder="jordan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#00296b] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">Inquiry Category</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                  >
                    <option>Admissions Inquiry</option>
                    <option>Scholarships & Financial Aid</option>
                    <option>International Visa (F-1) Support</option>
                    <option>Campus Visit Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">Target Campus</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none"
                  >
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.name}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-neutral-700 mb-1">Your Question or Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your question regarding admission requirements or scholarships..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#00296b] outline-none resize-none"
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
                className="w-full py-3.5 bg-[#00296b] hover:bg-[#002054] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry to Counselors'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
