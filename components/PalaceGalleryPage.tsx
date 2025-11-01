import React, { useState, useEffect } from 'react';
import { PALACE_IMAGES } from '../constants';
import { Language } from '../types';

interface PalaceGalleryPageProps {
  language: Language;
}

const UI_STRINGS = {
  kn: {
    title: 'ಮೈಸೂರು ಅರಮನೆ ಗ್ಯಾಲರಿ',
    subtitle: 'ಮೈಸೂರಿನ ಐತಿಹಾಸಿಕ ಅರಮನೆಯ ವೈಭವವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
    closeImageView: 'ಚಿತ್ರ ವೀಕ್ಷಣೆ ಮುಚ್ಚಿ',
    prevImage: 'ಹಿಂದಿನ ಚಿತ್ರ',
    nextImage: 'ಮುಂದಿನ ಚಿತ್ರ'
  },
  en: {
    title: 'Mysore Palace Gallery',
    subtitle: 'Behold the grandeur of the historic palace of Mysore.',
    closeImageView: 'Close image view',
    prevImage: 'Previous image',
    nextImage: 'Next image'
  }
};

const PalaceGalleryPage: React.FC<PalaceGalleryPageProps> = ({ language }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const strings = UI_STRINGS[language];
  
  const handleCloseLightbox = () => setSelectedImageIndex(null);

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex < PALACE_IMAGES.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') handleCloseLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <div className="w-full max-w-7xl px-4 py-8 font-['Poppins'] text-center text-white">
      <header className="mb-8">
        <h1 className="text-5xl font-bold" style={{ textShadow: '2px 2px 5px #000' }}>
          {strings.title}
        </h1>
        <h2 className="mt-4 text-xl" style={{ textShadow: '1px 1px 4px #000' }}>
          {strings.subtitle}
        </h2>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-10">
        {PALACE_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className="bg-black/60 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image.src}
              alt={language === 'kn' ? image.alt_kn : image.alt_en}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <p className="p-3 text-base">
              {language === 'kn' ? image.alt_kn : image.alt_en}
            </p>
          </div>
        ))}
      </div>
      
       {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute p-2 text-4xl text-white transition-transform rounded-full z-10 top-4 right-4 bg-white/10 hover:bg-white/20 hover:scale-110"
            aria-label={strings.closeImageView}
          >
            &times;
          </button>
          
          {selectedImageIndex > 0 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white transition-transform rounded-full bg-white/10 hover:bg-white/20 hover:scale-110"
              aria-label={strings.prevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <img 
            src={PALACE_IMAGES[selectedImageIndex].src}
            alt={language === 'kn' ? PALACE_IMAGES[selectedImageIndex].alt_kn : PALACE_IMAGES[selectedImageIndex].alt_en} 
            className="object-contain max-w-[90vw] max-h-[90vh] shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
           {selectedImageIndex < PALACE_IMAGES.length - 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white transition-transform rounded-full bg-white/10 hover:bg-white/20 hover:scale-110"
              aria-label={strings.nextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
           )}
        </div>
      )}
    </div>
  );
};

export default PalaceGalleryPage;