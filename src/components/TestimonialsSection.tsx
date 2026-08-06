"use client";

import React from 'react';
import { useData } from '../context/DataContext';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, loading } = useData();

  if (loading) {
    return (
      <div className="py-16 bg-[#f4f7fa] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00296b]"></div>
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Ensure we have enough cards to fill wide screens and scroll smoothly
  let repeatedTestimonials = [...testimonials];
  if (testimonials.length > 0) {
    while (repeatedTestimonials.length < 8) {
      repeatedTestimonials = [...repeatedTestimonials, ...testimonials];
    }
  }

  return (
    <section className="py-20 bg-[#f8fafc] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#e8c47a] text-xs font-extrabold uppercase tracking-widest block mb-3">
            Testimonial
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#001b48] tracking-tight">
            We Care About Our Scholars' Experience Too
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Discover how our academic support and streamlined applications help doctoral candidates achieve their research and career breakthroughs.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-10 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/20 to-[#f8fafc]">
        {/* Fade gradients at the left and right edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track Wrapper */}
        <div className="flex w-max animate-marquee">
          {/* Track 1 */}
          <div className="flex gap-8 pr-8 shrink-0">
            {repeatedTestimonials.map((t, idx) => {
              const rating = t.rating || 5;
              return (
                <div 
                  key={`t1-${t.id}-${idx}`} 
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 pt-12 relative flex flex-col justify-between hover:shadow-md transition-all duration-300 w-[300px] sm:w-[350px] shrink-0 whitespace-normal"
                >
                  {/* Overlapping Avatar Container */}
                  <div className="absolute -top-7 left-6">
                    {t.avatar ? (
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`;
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center text-slate-400 font-bold text-lg uppercase">
                        {t.name.slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Quote Text */}
                  <div className="flex-grow">
                    <p className="text-neutral-600 text-[13px] sm:text-sm leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Card Footer Divider and Metadata */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-end justify-between">
                    <div className="pr-2">
                      <h4 className="font-bold text-neutral-900 text-sm tracking-tight leading-tight">
                        {t.name}
                      </h4>
                    </div>

                    {/* Stars Rating */}
                    <div className="flex gap-0.5 mb-1 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rating 
                              ? 'text-[#ff5e57] fill-[#ff5e57]' 
                              : 'text-slate-200 fill-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Track 2 (Duplicate for Seamless Loop) */}
          <div className="flex gap-8 pr-8 shrink-0">
            {repeatedTestimonials.map((t, idx) => {
              const rating = t.rating || 5;
              return (
                <div 
                  key={`t2-${t.id}-${idx}`} 
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 pt-12 relative flex flex-col justify-between hover:shadow-md transition-all duration-300 w-[300px] sm:w-[350px] shrink-0 whitespace-normal"
                >
                  {/* Overlapping Avatar Container */}
                  <div className="absolute -top-7 left-6">
                    {t.avatar ? (
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`;
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center text-slate-400 font-bold text-lg uppercase">
                        {t.name.slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Quote Text */}
                  <div className="flex-grow">
                    <p className="text-neutral-600 text-[13px] sm:text-sm leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Card Footer Divider and Metadata */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-end justify-between">
                    <div className="pr-2">
                      <h4 className="font-bold text-neutral-900 text-sm tracking-tight leading-tight">
                        {t.name}
                      </h4>
                    </div>

                    {/* Stars Rating */}
                    <div className="flex gap-0.5 mb-1 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rating 
                              ? 'text-[#ff5e57] fill-[#ff5e57]' 
                              : 'text-slate-200 fill-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
