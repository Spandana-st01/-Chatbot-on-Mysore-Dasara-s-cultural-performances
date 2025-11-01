import React from 'react';
import { View, Language } from '../types';

interface NavBarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onGoBackToWelcome: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const UI_STRINGS = {
  kn: {
    backToWelcome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    culturalGallery: 'ಸಾಂಸ್ಕೃತಿಕ ಗ್ಯಾಲರಿ',
    about: 'ಕುರಿತು',
    langButton: 'English',
  },
  en: {
    backToWelcome: 'Back to Welcome',
    culturalGallery: 'Cultural Gallery',
    about: 'About',
    langButton: 'ಕನ್ನಡ',
  },
};

const NavLink: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-lg font-semibold transition-all duration-200 rounded-md ${
      isActive
        ? 'text-yellow-900 bg-amber-200 shadow-inner'
        : 'text-white hover:bg-white/20'
    }`}
  >
    {label}
  </button>
);

const NavBar: React.FC<NavBarProps> = ({ currentView, onNavigate, onGoBackToWelcome, language, onToggleLanguage }) => {
  const strings = UI_STRINGS[language];
  return (
    <nav className="absolute top-0 z-20 flex items-center justify-between w-full p-4 bg-black/20 backdrop-blur-md">
      <button
        onClick={onGoBackToWelcome}
        className="flex items-center gap-2 p-2 text-lg font-semibold text-white transition-transform transform rounded-full hover:bg-white/20 hover:scale-105"
        aria-label={strings.backToWelcome}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Mysore Dasara</span>
      </button>

      <div className="flex items-center gap-2 p-1 rounded-full bg-black/30">
        <NavLink
          label={strings.culturalGallery}
          isActive={currentView === 'gallery'}
          onClick={() => onNavigate('gallery')}
        />
        <NavLink
          label={strings.about}
          isActive={currentView === 'about'}
          onClick={() => onNavigate('about')}
        />
      </div>

      <button
        onClick={onToggleLanguage}
        className="px-4 py-2 text-lg font-semibold text-white transition-all duration-300 bg-white/20 rounded-full hover:bg-white/40 ring-1 ring-white/30 shadow-lg hover:scale-105"
        aria-label={`Switch to ${language === 'kn' ? 'English' : 'Kannada'}`}
      >
        {strings.langButton}
      </button>
    </nav>
  );
};

export default NavBar;