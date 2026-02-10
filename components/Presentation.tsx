import React, { useState, useEffect, useRef } from 'react';
import { useSlides } from '../context/SlideContext';
import SlideRenderer from './SlideRenderer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PptxGenJS from 'pptxgenjs';

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

  // Export to PDF - 1 slide per page, full fit with auto fullscreen
  const exportToPDF = async () => {
    // Enter fullscreen mode for better capture
    const wasFullScreen = !!document.fullscreenElement;
    if (!wasFullScreen && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
      setIsFullScreen(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for fullscreen transition
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });

    const slideElement = document.querySelector('.slide-container') as HTMLElement;
    const originalWidth = slideElement?.style.width;
    const originalHeight = slideElement?.style.height;

    for (let i = 0; i < slides.length; i++) {
      setCurrentSlideIndex(i);
      
      // Set exact dimensions for proper aspect ratio
      if (slideElement) {
        slideElement.style.width = '1920px';
        slideElement.style.height = '1080px';
      }

      // Longer delay to allow animated charts to fully render at proper size
      await new Promise(resolve => setTimeout(resolve, 2500));

      if (slideElement) {
        const canvas = await html2canvas(slideElement, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add image to fit full page perfectly
        pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080, undefined, 'FAST');
      }
    }

    // Restore original dimensions
    if (slideElement) {
      slideElement.style.width = originalWidth || '';
      slideElement.style.height = originalHeight || '';
    }

    pdf.save('presentation.pdf');

    // Always exit fullscreen after export
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Export to PowerPoint - 1 slide per page, full fit with auto fullscreen
  const exportToPPTX = async () => {
    // Enter fullscreen mode for better capture
    const wasFullScreen = !!document.fullscreenElement;
    if (!wasFullScreen && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
      setIsFullScreen(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for fullscreen transition
    }

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    pptx.defineLayout({ name: 'CUSTOM', width: 10, height: 5.625 }); // 16:9 aspect ratio
    pptx.layout = 'CUSTOM';

    const slideElement = document.querySelector('.slide-container') as HTMLElement;
    const originalWidth = slideElement?.style.width;
    const originalHeight = slideElement?.style.height;

    for (let i = 0; i < slides.length; i++) {
      setCurrentSlideIndex(i);
      
      // Set exact dimensions for proper aspect ratio
      if (slideElement) {
        slideElement.style.width = '1920px';
        slideElement.style.height = '1080px';
      }

      // Longer delay to allow animated charts to fully render at proper size
      await new Promise(resolve => setTimeout(resolve, 2500));

      if (slideElement) {
        const canvas = await html2canvas(slideElement, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        const slide = pptx.addSlide();
        // Add image to fit full slide perfectly (100% width and height)
        slide.addImage({
          data: imgData,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
          sizing: { type: 'cover', w: '100%', h: '100%' }
        });
      }
    }

    // Restore original dimensions
    if (slideElement) {
      slideElement.style.width = originalWidth || '';
      slideElement.style.height = originalHeight || '';
    }

    await pptx.writeFile({ fileName: 'presentation.pptx' });

    // Always exit fullscreen after export
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
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
            // Exit full screen when auto play ends
            if (document.fullscreenElement && document.exitFullscreen) {
              document.exitFullscreen();
            }
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
        <div className="flex-1 relative overflow-hidden bg-white max-w-[1920px] mx-auto w-full shadow-2xl group">
          <div className="slide-container w-full h-full">
            <SlideRenderer data={slides[currentSlideIndex]} />
          </div>

          {/* Control Footer Bar - Icon buttons only, Auto-hide in full screen */}
          {!isFullScreen && (
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-40">
              {/* Export to PDF Button */}
              <button 
                  onClick={exportToPDF}
                  className="p-3 rounded-full transition-all hover:shadow-lg bg-white/20 hover:bg-green-600/90 text-white backdrop-blur-sm"
                  title="Export to PDF"
              >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </button>

              {/* Export to PowerPoint Button */}
              <button 
                  onClick={exportToPPTX}
                  className="p-3 rounded-full transition-all hover:shadow-lg bg-white/20 hover:bg-orange-600/90 text-white backdrop-blur-sm"
                  title="Export to PowerPoint"
              >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </button>

              {/* Full Screen Button */}
              <button 
                  onClick={toggleFullScreen}
                  className={`p-3 rounded-full transition-all hover:shadow-lg ${
                    isFullScreen 
                      ? 'bg-utkarsh-blue/90 text-white hover:bg-utkarsh-blue' 
                      : 'bg-white/20 hover:bg-utkarsh-blue/90 text-white backdrop-blur-sm'
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
                  className={`p-3 rounded-full transition-all hover:shadow-lg ${
                    isAutoPlay 
                      ? 'bg-utkarsh-yellow/90 text-gray-800 hover:bg-utkarsh-yellow' 
                      : 'bg-white/20 hover:bg-utkarsh-yellow/90 text-white hover:text-gray-800 backdrop-blur-sm'
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
          )}

          {/* Navigation Overlays - Smaller, Show on Hover Only */}
          <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all z-30 opacity-0 group-hover:opacity-100 ${currentSlideIndex === 0 ? '!opacity-0 pointer-events-none' : ''}`}
          >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all z-30 opacity-0 group-hover:opacity-100 ${currentSlideIndex === slides.length - 1 ? '!opacity-0 pointer-events-none' : ''}`}
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

    </>
  );
};

export default Presentation;
