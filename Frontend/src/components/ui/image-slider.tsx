'use client';

import { useRef } from 'react';

export default function ImageSlider({ images, altPrefix }: { images: string[], altPrefix: string }) {
  const sliderRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="slider-wrapper" style={{ position: 'relative', marginBottom: '28px' }}>
      <div className="gallery-slider" ref={sliderRef} style={{ marginBottom: 0, paddingBottom: 0 }}>
        {images.map((img, i) => (
          <div key={i} className="gallery-slider__item">
            <img src={img} alt={`${altPrefix} - Foto ${i + 1}`} />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={scrollLeft}
            className="slider-btn slider-btn--prev"
            aria-label="Foto sebelumnya"
          >
            &#10094;
          </button>
          <button 
            onClick={scrollRight}
            className="slider-btn slider-btn--next"
            aria-label="Foto selanjutnya"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
}
