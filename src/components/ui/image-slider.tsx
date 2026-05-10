'use client';

import { useRef, useState, useEffect } from 'react';

export default function ImageSlider({ images, altPrefix }: { images: string[], altPrefix: string }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(images.length > 1);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 2); // -2 for slight rounding buffer
      
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [images]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollTo = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: index * sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="slider-wrapper modern-slider">
      <div 
        className="gallery-slider hide-scrollbar" 
        ref={sliderRef} 
        onScroll={checkScroll}
      >
        {images.map((img, i) => (
          <div key={i} className="gallery-slider__item">
            <img src={img} alt={`${altPrefix} - Foto ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={scrollLeft}
            className={`slider-btn slider-btn--prev ${!canScrollLeft ? 'slider-btn--disabled' : ''}`}
            aria-label="Foto sebelumnya"
            disabled={!canScrollLeft}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className={`slider-btn slider-btn--next ${!canScrollRight ? 'slider-btn--disabled' : ''}`}
            aria-label="Foto selanjutnya"
            disabled={!canScrollRight}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="slider-dots">
            {images.map((_, i) => (
              <button 
                key={i} 
                className={`slider-dot ${i === activeIndex ? 'slider-dot--active' : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Ke foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
