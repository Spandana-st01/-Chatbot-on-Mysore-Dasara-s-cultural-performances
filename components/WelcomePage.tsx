import React, { useState, useEffect } from 'react';

interface WelcomePageProps {
  onEnter: () => void;
  language: 'kn' | 'en';
  onToggleLanguage: () => void;
}

const UI_STRINGS = {
  kn: {
    title: 'ಮೈಸೂರು ದಸರಾಕ್ಕೆ ಸ್ವಾಗತ',
    subtitle: 'ಸಾಂಸ್ಕೃತಿಕ ವೈಭವದ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ',
    button: 'ಪ್ರದರ್ಶನವನ್ನು ಪ್ರವೇಶಿಸಿ',
    langButton: 'English',
  },
  en: {
    title: 'Welcome to Mysore Dasara',
    subtitle: 'Explore a world of cultural splendor',
    button: 'Enter the Exhibition',
    langButton: 'ಕನ್ನಡ',
  },
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnter, language, onToggleLanguage }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after the component mounts
    const timer = setTimeout(() => setIsContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen text-white bg-center bg-cover"
      style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Mysore_Palace_Night.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className={`relative z-10 text-center transition-opacity duration-1000 ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 
            className="text-5xl font-extrabold text-white md:text-8xl" 
            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}
        >
          {UI_STRINGS[language].title}
        </h1>
        <p 
            className="mt-4 text-xl md:text-3xl text-amber-300"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)' }}
        >
          {UI_STRINGS[language].subtitle}
        </p>
        <button
          onClick={onEnter}
          className="mt-12 px-8 py-4 text-xl font-bold text-yellow-900 transition-all duration-300 ease-in-out transform bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/50"
        >
          {UI_STRINGS[language].button}
        </button>
      </div>

       <button
        onClick={onToggleLanguage}
        className="absolute z-20 px-4 py-2 text-lg font-semibold transition-all duration-300 top-6 right-6 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 text-white ring-1 ring-white/30 shadow-lg hover:scale-105"
        aria-label={`Switch to ${language === 'kn' ? 'English' : 'Kannada'}`}
      >
         {UI_STRINGS[language].langButton}
      </button>

    </div>
  );
};

export default WelcomePage;