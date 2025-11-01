import React from 'react';
import { Performance } from '../types';
import { PERFORMANCES } from '../constants';
import GalleryCard from './GalleryCard';

interface GalleryProps {
  onSelectPerformance: (performance: Performance) => void;
  language: 'kn' | 'en';
}

const Gallery: React.FC<GalleryProps> = ({ onSelectPerformance, language }) => {
  return (
    <div className="grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {PERFORMANCES.map((performance, index) => (
        <GalleryCard
          key={performance.id}
          performance={performance}
          onSelect={onSelectPerformance}
          language={language}
          index={index}
        />
      ))}
    </div>
  );
};

export default Gallery;