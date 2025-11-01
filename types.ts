// Fix: Added PalaceImage interface for typing the palace images data.
export interface PalaceImage {
  id: string;
  src: string;
  alt_kn: string;
  alt_en: string;
}

export interface Performance {
  id: string;
  name_kn: string;
  name_en: string;
  greeting_kn: string;
  greeting_en: string;
  image: string;
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface QuizData {
  question: string;
  options: string[];
  answer: string;
}

export interface ChatMessage {
  author: MessageAuthor;
  text: string;
  isQuizOffer?: boolean;
  quizData?: QuizData;
}

export type Language = 'kn' | 'en';
export type View = 'welcome' | 'gallery' | 'about';