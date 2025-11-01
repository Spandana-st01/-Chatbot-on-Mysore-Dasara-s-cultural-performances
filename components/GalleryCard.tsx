import React, { useState, useEffect } from 'react';
import { Performance } from '../types';

interface GalleryCardProps {
  performance: Performance;
  onSelect: (performance: Performance) => void;
  language: 'kn' | 'en';
  index: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ performance, onSelect, language, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); 

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-red-800/40 flex items-center justify-center p-4 bg-gradient-to-br from-orange-400 via-red-500 to-red-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      onClick={() => onSelect(performance)}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <h3 
        className="text-center text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-105" 
        style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
      >
        {language === 'kn' ? performance.name_kn : performance.name_en}
      </h3>
    </div>
  );
};

export default GalleryCard;