import React, { useState, useEffect } from 'react';
import { useSlides } from '../context/SlideContext';
import SlideRenderer from './SlideRenderer';

const Presentation: React.FC = () => {
  const { slides } = useSlides();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <>
      <div className="w-full h-screen flex flex-col bg-gray-900 screen-only">
        <div className="flex-1 relative overflow-hidden bg-white max-w-[1920px] mx-auto w-full shadow-2xl">
          <SlideRenderer data={slides[currentSlideIndex]} />
          
          {/* Print Button */}
          <button 
              onClick={() => window.print()}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/5 hover:bg-black/20 text-gray-400 hover:text-gray-800 transition-all z-30 pointer-events-auto"
              title="Print Slides"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </button>

          {/* Navigation Overlays */}
          <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/10 hover:bg-black/30 text-gray-600 hover:text-white transition-all z-30 ${currentSlideIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/10 hover:bg-black/30 text-gray-600 hover:text-white transition-all z-30 ${currentSlideIndex === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        {/* Small progress bar */}
        <div className="h-1 bg-gray-800 w-full">
           <div 
              className="h-full bg-utkarsh-red transition-all duration-300 ease-out" 
              style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
           ></div>
        </div>
      </div>

      {/* Print Layout */}
      <div className="print-only">
        {slides.map((slide) => (
           <div key={slide.id} className="print-slide-page">
              <SlideRenderer data={slide} isPrint={true} />
           </div>
        ))}
      </div>
    </>
  );
};

export default Presentation;
