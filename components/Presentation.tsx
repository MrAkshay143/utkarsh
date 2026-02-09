import React, { useState, useEffect, useRef } from 'react';
import { useSlides } from '../context/SlideContext';
import SlideRenderer from './SlideRenderer';

const Presentation: React.FC = () => {
  const { slides } = useSlides();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlay(false); // Stop at the end
            return prev;
          }
        });
      }, 5000); // Change slide every 5 seconds
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay, slides.length]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullScreen();
      } else if (e.key === 'Escape' && isAutoPlay) {
        setIsAutoPlay(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isAutoPlay]);

  return (
    <>
      <div className="w-full h-screen flex flex-col bg-gray-900 screen-only">
        <div className="flex-1 relative overflow-hidden bg-white max-w-[1920px] mx-auto w-full shadow-2xl">
          <SlideRenderer data={slides[currentSlideIndex]} />
          
          {/* Control Dock Panel */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
            {/* Print Button */}
            <button 
                onClick={() => window.print()}
                className="p-3 rounded-lg bg-white/90 hover:bg-white text-gray-600 hover:text-utkarsh-red transition-all shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-200"
                title="Print Slides (Ctrl+P)"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            </button>

            {/* Full Screen Button */}
            <button 
                onClick={toggleFullScreen}
                className={`p-3 rounded-lg transition-all shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-200 ${
                  isFullScreen 
                    ? 'bg-utkarsh-blue text-white hover:bg-utkarsh-blue/90' 
                    : 'bg-white/90 hover:bg-white text-gray-600 hover:text-utkarsh-blue'
                }`}
                title={isFullScreen ? "Exit Full Screen (F or Esc)" : "Enter Full Screen (F)"}
            >
                {isFullScreen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                )}
            </button>

            {/* Auto Play Button */}
            <button 
                onClick={toggleAutoPlay}
                className={`p-3 rounded-lg transition-all shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-200 ${
                  isAutoPlay 
                    ? 'bg-utkarsh-yellow text-gray-800 hover:bg-utkarsh-yellow/90' 
                    : 'bg-white/90 hover:bg-white text-gray-600 hover:text-utkarsh-yellow'
                }`}
                title={isAutoPlay ? "Stop Auto Play (Esc)" : "Start Auto Play (5s per slide)"}
            >
                {isAutoPlay ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
            </button>
          </div>

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
