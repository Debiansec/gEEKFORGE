import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Pause, Play } from 'lucide-react';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div id="testimonials-carousel" className="relative w-full max-w-4xl mx-auto">
      {/* Background Accent Glow: Neon Blue to Purple */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-60"></div>

      {/* Main Card */}
      <div className="relative bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          {/* Client Avatar & Meta */}
          <div className="flex items-center md:flex-col md:items-center text-left md:text-center shrink-0 gap-4">
            <div className="relative">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-blue-500/25 dark:ring-purple-500/30"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-1 shadow-xs" title="Verified Customer">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                {current.name}
              </h4>
              <p className="text-xs text-blue-600 dark:text-purple-400 font-semibold">
                {current.role}, {current.company}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                📍 {current.location}
              </p>
              <span className="inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-purple-500/15 text-blue-700 dark:text-purple-300 font-semibold border border-blue-500/20 dark:border-purple-500/20">
                {current.projectType}
              </span>
            </div>
          </div>

          {/* Quote & Stars */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                5.0 Verified Client Review
              </span>
            </div>

            <div className="relative">
              <Quote className="w-8 h-8 text-blue-500/15 dark:text-purple-400/20 absolute -top-4 -left-3 -z-10" />
              <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic">
                "{current.review}"
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              id="testimonial-play-pause-btn"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline font-medium">{isPlaying ? 'Playing' : 'Paused'}</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="testimonial-prev-btn"
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-xs cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="testimonial-next-btn"
              type="button"
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-xs cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
