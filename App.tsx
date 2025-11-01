import React, { useState } from 'react';
import Gallery from './components/Gallery';
import ChatModal from './components/ChatModal';
import { Performance, View, Language } from './types';
import WelcomePage from './components/WelcomePage';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';

interface MinimizedChatProps {
  performance: Performance;
  onMaximize: () => void;
  onClose: () => void;
  language: Language;
}

const MinimizedChat: React.FC<MinimizedChatProps> = ({ performance, onMaximize, onClose, language }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 p-2 pr-3 bg-amber-50/95 backdrop-blur-xl border border-yellow-400/50 rounded-full shadow-2xl shadow-yellow-800/20 text-yellow-900 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <span className="ml-2 font-bold">{language === 'kn' ? performance.name_kn : performance.name_en}</span>
      <button
        onClick={onMaximize}
        className="p-2 font-mono text-xl font-bold leading-none text-yellow-800 transition-transform rounded-full hover:bg-black/10 hover:scale-110"
        aria-label="Maximize chat"
      >
        □
      </button>
      <button
        onClick={onClose}
        className="p-2 text-2xl text-yellow-800 transition-transform rounded-full hover:bg-black/10 hover:scale-110"
        aria-label="Close chat"
      >
        &times;
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isChatFullscreen, setIsChatFullscreen] = useState(false);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };
  
  const handleGoBackToWelcome = () => {
    setCurrentView('welcome');
  };

  const handleSelectPerformance = (performance: Performance) => {
    setSelectedPerformance(performance);
    setIsChatMinimized(false);
    setIsChatFullscreen(false);
  };

  const handleCloseChat = () => {
    setSelectedPerformance(null);
    setIsChatMinimized(false);
    setIsChatFullscreen(false);
  };

  const handleMinimizeChat = () => {
    setIsChatMinimized(true);
    setIsChatFullscreen(false);
  };

  const handleMaximizeChat = () => {
    setIsChatMinimized(false);
  };
  
  const handleToggleFullscreen = () => {
    setIsChatFullscreen(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'kn' ? 'en' : 'kn');
  };

  const UI_STRINGS = {
    kn: {
      title: 'ಮೈಸೂರು ದಸರಾ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು 🎉',
      subtitle: 'ನಮ್ಮ ಸಂವಾದಾತ್ಮಕ ಚಾಟ್‌ಬಾಟ್ ಮೂಲಕ ಅದರ ಕಥೆಯನ್ನು ಅನ್ವೇಷಿಸಲು ಯಾವುದೇ ಚಿತ್ರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ!',
    },
    en: {
      title: 'Mysore Dasara Cultural Performances 🎉',
      subtitle: 'Click any image to explore its story through our interactive chatbot!',
    }
  };
  
  const renderCurrentView = () => {
    switch (currentView) {
      case 'gallery':
        return (
          <>
            <header className="w-full max-w-6xl text-center">
              <h1 className="text-4xl font-extrabold text-white md:text-6xl" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                {UI_STRINGS[language].title}
              </h1>
              <p className="mt-2 text-lg text-amber-100" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
                {UI_STRINGS[language].subtitle}
              </p>
            </header>
            <main className="flex items-center justify-center flex-grow w-full mt-8">
              <Gallery onSelectPerformance={handleSelectPerformance} language={language} />
            </main>
          </>
        );
      case 'about':
        return <AboutPage language={language} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen font-sans">
      {currentView === 'welcome' ? (
        <WelcomePage
          onEnter={() => handleNavigate('gallery')}
          language={language}
          onToggleLanguage={toggleLanguage}
        />
      ) : (
        <div
          className="relative min-h-screen bg-center bg-cover"
          style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Mysore_Palace_Night.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-red-700/30 to-rose-900/40" />
          
          <NavBar 
            currentView={currentView}
            onNavigate={handleNavigate}
            onGoBackToWelcome={handleGoBackToWelcome}
            language={language}
            onToggleLanguage={toggleLanguage}
          />

          <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-24 pb-8">
            {renderCurrentView()}
          </div>
        </div>
      )}

      {selectedPerformance && !isChatMinimized && (
        <ChatModal
          performance={selectedPerformance}
          onClose={handleCloseChat}
          onMinimize={handleMinimizeChat}
          initialLanguage={language}
          isFullscreen={isChatFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      )}
      {selectedPerformance && isChatMinimized && (
        <MinimizedChat
          performance={selectedPerformance}
          onMaximize={handleMaximizeChat}
          onClose={handleCloseChat}
          language={language}
        />
      )}
    </div>
  );
};

export default App;