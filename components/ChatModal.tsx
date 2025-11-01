import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Chat } from '@google/genai';
import { Performance, ChatMessage, MessageAuthor, QuizData } from '../types';
import { createChatSession } from '../services/geminiService';

// Fix for SpeechRecognition API not being in standard TypeScript lib
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Language = 'kn' | 'en';

const UI_STRINGS = {
  kn: {
    placeholder: "ಪ್ರಶ್ನೆ ಕೇಳಿ...",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    error: "ಕ್ಷಮಿಸಿ, ದೋಷ ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    closeAria: "ಚಾಟ್ ಮುಚ್ಚಿ",
    minimizeAria: "ಚಾಟ್ ಮರೆಮಾಡಿ",
    maximizeAria: "ಚಾಟ್ ಗರಿಷ್ಠಗೊಳಿಸಿ",
    restoreAria: "ಚಾಟ್ ಮರುಸ್ಥಾಪಿಸಿ",
    micAriaStart: "ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಪ್ರಾರಂಭಿಸಿ",
    micAriaStop: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
    sendAria: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    startQuiz: "ರಸಪ್ರಶ್ನೆ ಪ್ರಾರಂಭಿಸಿ",
    notNow: "ಈಗ ಬೇಡ",
    nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
    correct: "ಸರಿ!",
    incorrect: "ತಪ್ಪು!",
    aiTyping: "AI ಬರೆಯುತ್ತಿದೆ",
  },
  en: {
    placeholder: "Ask a question...",
    listening: "Listening...",
    error: "Sorry, an error occurred. Please try again.",
    closeAria: "Close chat",
    minimizeAria: "Minimize chat",
    maximizeAria: "Maximize chat",
    restoreAria: "Restore chat",
    micAriaStart: "Start voice input",
    micAriaStop: "Stop recording",
    sendAria: "Send message",
    startQuiz: "Start Quiz",
    notNow: "Not Now",
    nextQuestion: "Next Question",
    correct: "Correct!",
    incorrect: "Incorrect!",
    aiTyping: "AI is typing",
  }
}

interface ChatModalProps {
  performance: Performance;
  onClose: () => void;
  onMinimize: () => void;
  initialLanguage: Language;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ performance, onClose, onMinimize, initialLanguage, isFullscreen, onToggleFullscreen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micUnsupported, setMicUnsupported] = useState(false);
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [isVisible, setIsVisible] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, { selected: string | null; submitted: boolean }>>({});
  const [activeQuizOffer, setActiveQuizOffer] = useState<number | null>(null);

  const chatSessionRef = useRef<Chat | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatSessionRef.current = createChatSession(performance, language);
    const initialMessage: ChatMessage = {
      author: MessageAuthor.AI,
      text: language === 'kn' ? performance.greeting_kn : performance.greeting_en,
    };
    setMessages([initialMessage]);
    setQuizAnswers({});
    setActiveQuizOffer(null);
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setMicUnsupported(true);
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [performance, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  const handleLanguageToggle = () => setLanguage(prevLang => prevLang === 'kn' ? 'en' : 'kn');

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = { author: MessageAuthor.USER, text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        const response = await chatSessionRef.current.sendMessage({ message: messageText });
        const aiResponseText = response.text;
        
        const jsonRegex = /```json\n([\s\S]*?)\n```/;
        const match = aiResponseText.match(jsonRegex);

        let aiMessage: ChatMessage;

        if (match && match[1]) {
           try {
            const parsedQuizData: QuizData = JSON.parse(match[1]);
            aiMessage = {
              author: MessageAuthor.AI,
              text: parsedQuizData.question,
              quizData: parsedQuizData,
            };
           } catch (e) {
             console.error("Failed to parse quiz JSON:", e);
             aiMessage = { author: MessageAuthor.AI, text: aiResponseText };
           }
        } else if (aiResponseText.toLowerCase().includes('quiz?')) {
            aiMessage = { author: MessageAuthor.AI, text: aiResponseText, isQuizOffer: true };
            setActiveQuizOffer(messages.length + 1); // +1 for the user message, +1 for this AI message
        } else {
            aiMessage = { author: MessageAuthor.AI, text: aiResponseText };
        }
        
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = { author: MessageAuthor.AI, text: UI_STRINGS[language].error };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
  };
  
  const handleQuizResponse = (response: string, offerIndex: number) => {
    setActiveQuizOffer(null);
    sendMessage(response);
  };

  const handleSelectAnswer = (messageIndex: number, option: string) => {
    if (quizAnswers[messageIndex]?.submitted) return;
    setQuizAnswers(prev => ({ ...prev, [messageIndex]: { ...prev[messageIndex], selected: option } }));
  };

  const handleSubmitAnswer = (messageIndex: number) => {
     setQuizAnswers(prev => ({ ...prev, [messageIndex]: { ...prev[messageIndex], submitted: true } }));
  };

  const modalContainerClasses = isFullscreen ? 'w-full h-full max-w-none max-h-none rounded-none' : 'w-11/12 max-w-2xl h-[90vh] max-h-[700px] rounded-2xl';

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={!isFullscreen ? onClose : undefined}>
        <div className={`relative flex flex-col bg-amber-50/95 backdrop-blur-xl border border-yellow-400/50 shadow-2xl shadow-yellow-800/20 text-gray-800 transition-all duration-300 ease-in-out ${modalContainerClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onClick={(e) => e.stopPropagation()} style={{ color: '#4a0e0e' }}>
          <header className={`flex items-center justify-between p-4 border-b border-yellow-400/30 bg-white/40 ${isFullscreen ? 'rounded-t-none' : 'rounded-t-2xl'}`}>
            <h2 className="text-2xl font-bold text-yellow-900">{language === 'kn' ? performance.name_kn : performance.name_en}</h2>
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={handleLanguageToggle} className="px-3 py-1 text-lg font-semibold text-yellow-800 transition-colors border border-yellow-600 rounded-full hover:bg-yellow-600 hover:text-white" aria-label={`Switch to ${language === 'kn' ? 'English' : 'Kannada'}`}>{language === 'kn' ? 'EN' : 'ಕ'}</button>
              <button onClick={onMinimize} className="p-2 font-mono text-2xl font-bold leading-none text-yellow-800 transition-transform rounded-full hover:bg-black/10 hover:scale-110" aria-label={UI_STRINGS[language].minimizeAria}>&ndash;</button>
              <button onClick={onToggleFullscreen} className="p-2 text-yellow-800 transition-transform rounded-full hover:bg-black/10 hover:scale-110" aria-label={isFullscreen ? UI_STRINGS[language].restoreAria : UI_STRINGS[language].maximizeAria}>
                {isFullscreen ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12V8a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2h-2" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" /></svg>}
              </button>
              <button onClick={onClose} className="p-2 text-2xl text-yellow-800 transition-transform rounded-full hover:bg-black/10 hover:scale-110" aria-label={UI_STRINGS[language].closeAria}>&times;</button>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => {
                const quizAnswer = quizAnswers[index];
                return (
                <div key={index} className={`flex items-end gap-2 ${msg.author === MessageAuthor.USER ? 'justify-end' : 'justify-start'}`}>
                  {msg.author === MessageAuthor.AI && <div className="flex items-center justify-center w-8 h-8 text-sm bg-yellow-400 rounded-full text-yellow-900 font-bold flex-shrink-0">AI</div>}
                  <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl whitespace-pre-wrap shadow-sm ${msg.author === MessageAuthor.USER ? 'bg-yellow-200 text-yellow-900 rounded-br-none' : 'bg-white/60 text-gray-800 rounded-bl-none'}`}>
                    <p className="font-semibold">{msg.text}</p>
                    {msg.isQuizOffer && activeQuizOffer === index && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleQuizResponse(language === 'kn' ? 'ಹೌದು, ಪ್ರಾರಂಭಿಸಿ' : 'Yes, start quiz', index)} className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full hover:bg-green-300">👍 {UI_STRINGS[language].startQuiz}</button>
                        <button onClick={() => handleQuizResponse(language === 'kn' ? 'ಈಗ ಬೇಡ' : 'Not now', index)} className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300">👎 {UI_STRINGS[language].notNow}</button>
                      </div>
                    )}
                    {msg.quizData && (
                        <div className="mt-3 space-y-2">
                        {msg.quizData.options.map((option, optIndex) => {
                          const isSelected = quizAnswer?.selected === option;
                          let buttonClass = 'w-full p-2 text-left rounded-lg transition-colors border ';
                          if (quizAnswer?.submitted) {
                            const isCorrect = option === msg.quizData.answer;
                            if (isCorrect) buttonClass += 'bg-green-100 border-green-400 text-green-800';
                            else if (isSelected) buttonClass += 'bg-red-100 border-red-400 text-red-800';
                            else buttonClass += 'bg-gray-100 border-gray-300 text-gray-500';
                          } else {
                            buttonClass += isSelected ? 'bg-yellow-200 border-yellow-400' : 'bg-white hover:bg-yellow-100 border-gray-300';
                          }
                          return <button key={optIndex} onClick={() => handleSelectAnswer(index, option)} className={buttonClass} disabled={quizAnswer?.submitted}>{option}</button>;
                        })}
                        {quizAnswer?.submitted ? (
                            <div className={`mt-2 font-bold ${quizAnswer.selected === msg.quizData.answer ? 'text-green-600' : 'text-red-600'}`}>
                              {quizAnswer.selected === msg.quizData.answer ? UI_STRINGS[language].correct : UI_STRINGS[language].incorrect}
                              <button onClick={() => sendMessage(language === 'kn' ? 'ಮುಂದಿನ ಪ್ರಶ್ನೆ' : 'Next question')} className="ml-4 px-3 py-1 text-sm font-semibold text-white bg-yellow-600 rounded-full hover:bg-yellow-500">
                                {UI_STRINGS[language].nextQuestion} &rarr;
                              </button>
                            </div>
                        ) : (
                            <button onClick={() => handleSubmitAnswer(index)} disabled={!quizAnswer?.selected} className="w-full px-4 py-2 mt-2 font-bold text-white bg-yellow-500 rounded-lg disabled:bg-yellow-300 hover:bg-yellow-600">{language === 'kn' ? 'ಉತ್ತರ ಪರಿಶೀಲಿಸಿ' : 'Check Answer'}</button>
                        )}
                        </div>
                    )}
                  </div>
                </div>
              )})}
              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="flex items-center justify-center w-8 h-8 text-sm bg-yellow-400 rounded-full text-yellow-900 font-bold flex-shrink-0">AI</div>
                  <div className="px-4 py-2 bg-white/60 rounded-2xl rounded-bl-none">
                    <div className="flex items-center gap-2 text-sm text-gray-600 italic">
                      <span>{UI_STRINGS[language].aiTyping}</span>
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-0"></span>
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <form onSubmit={handleFormSubmit} className={`p-4 border-t border-yellow-400/30 bg-white/40 ${isFullscreen ? 'rounded-b-none' : 'rounded-b-2xl'}`}>
            <div className="flex items-center gap-2">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={isRecording ? UI_STRINGS[language].listening : UI_STRINGS[language].placeholder} className="flex-1 w-full px-4 py-2 bg-white/50 border border-yellow-400/50 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500" disabled={isLoading} />
              <button type="button" onClick={() => {/* handleToggleRecording */}} disabled={micUnsupported} className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-yellow-800 hover:bg-black/10'}`} aria-label={isRecording ? UI_STRINGS[language].micAriaStop : UI_STRINGS[language].micAriaStart}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg>
              </button>
              <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2 text-white bg-yellow-600 rounded-full disabled:bg-yellow-400/50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors" aria-label={UI_STRINGS[language].sendAria}><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatModal;