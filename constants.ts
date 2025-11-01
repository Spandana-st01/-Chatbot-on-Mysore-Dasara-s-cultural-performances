import { Performance, PalaceImage } from './types';

export const PERFORMANCES: Performance[] = [
  {
    id: 'yakshagana',
    name_kn: 'ಯಕ್ಷಗಾನ',
    name_en: 'Yakshagana',
    greeting_kn: 'ನಮಸ್ಕಾರ! ಯಕ್ಷಗಾನದ ವರ್ಣರಂಜಿತ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸೋಣ - ಕರ್ನಾಟಕದ ಅದ್ಭುತ ರಂಗಕಲೆ! 🎭',
    greeting_en: 'Namaskara! Let’s explore the vibrant world of Yakshagana — Karnataka’s colorful theatre art! 🎭',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Yakshagana_-_Badaguthittu.jpg',
  },
  {
    id: 'dollu-kunitha',
    name_kn: 'ಡೊಳ್ಳು ಕುಣಿತ',
    name_en: 'Dollu Kunitha',
    greeting_kn: 'ಭಕ್ತಿಯ ಡೊಳ್ಳುಗಳು! 🥁 ಡೊಳ್ಳು ಕುಣಿತವು ಶಕ್ತಿ ಮತ್ತು ಲಯವನ್ನು ಸಂಕೇತಿಸುವ ಒಂದು ಶಕ್ತಿಯುತ ಜಾನಪದ ನೃತ್ಯ.',
    greeting_en: 'Drums of devotion! 🥁 Dollu Kunitha is an energetic folk dance symbolizing strength and rhythm.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Dollu_Kunitha_-_A_folk_art_from_Karnataka%2C_India.jpg',
  },
  {
    id: 'veeragase',
    name_kn: 'ವೀರಗಾಸೆ',
    name_en: 'Veeragase',
    greeting_kn: 'ಶೌರ್ಯ ಮತ್ತು ಭಕ್ತಿಯ ನೃತ್ಯ ವೀರಗಾಸೆಗೆ ಸ್ವಾಗತ. ಈ ನೃತ್ಯದ ಹಿಂದಿನ ಪೌರಾಣಿಕ ಕಥೆಗಳನ್ನು ತಿಳಿಯೋಣ! ⚔️',
    greeting_en: 'Welcome to Veeragase, the dance of valor and devotion. Let\'s uncover the mythological tales behind it! ⚔️',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Veeragase_performance.jpg',
  },
  {
    id: 'bharatanatyam',
    name_kn: 'ಭರತನಾಟ್ಯ',
    name_en: 'Bharatanatyam',
    greeting_kn: 'ಭಾವ, ರಾಗ, ತಾಳದ ಸಂಗಮವಾದ ಭರತನಾಟ್ಯದ ಪ್ರಪಂಚಕ್ಕೆ ಸುಸ್ವಾಗತ. ಈ ಶಾಸ್ತ್ರೀಯ ಕಲೆಯ ಬಗ್ಗೆ ಏನು ತಿಳಿಯಬಯಸುತ್ತೀರಿ? 💃',
    greeting_en: 'Welcome to the world of Bharatanatyam, a confluence of expression, melody, and rhythm. What would you like to know about this classical art? 💃',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharatanatyam_Performance.jpg',
  },
  {
    id: 'carnatic-music',
    name_kn: 'ಕರ್ಣಾಟಕ ಸಂಗೀತ',
    name_en: 'Carnatic Music',
    greeting_kn: 'ಕರ್ಣಾಟಕ ಸಂಗೀತದ ಸುಮಧುರ ಸ್ವರಗಳಿಗೆ ಸ್ವಾಗತ. ಈ ದೈವಿಕ ಸಂಗೀತ ಪ್ರಕಾರದ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳೇನು? 🎶',
    greeting_en: 'Welcome to the melodious notes of Carnatic Music. What are your questions about this divine musical form? 🎶',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/A_Carnatic_music_concert.jpg',
  },
  {
    id: 'jamboo-savari',
    name_kn: 'ಜಂಬೂ ಸವಾರಿ',
    name_en: 'Jamboo Savari',
    greeting_kn: 'ಮೈಸೂರು ದಸರಾದ ಭವ್ಯ ಮೆರವಣಿಗೆಗೆ ಸ್ವಾಗತ! ಅದರ ರಾಜಮನೆತನದ ಸಂಪ್ರದಾಯಗಳ ಮೂಲಕ ಸಾಗೋಣ! 🐘✨',
    greeting_en: 'Welcome to the grand procession of Mysore Dasara! Let’s march through its royal traditions! 🐘✨',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mysore_Dasara_Procession_2013.jpg',
  },
  {
    id: 'folk-art',
    name_kn: 'ಜಾನಪದ ಕಲಾ ಪ್ರದರ್ಶನಗಳು',
    name_en: 'Folk Art Exhibitions',
    greeting_kn: 'ಕರ್ನಾಟಕದ ಜಾನಪದ ಕಲೆಗಳ ವೈವಿಧ್ಯಮಯ ಜಗತ್ತಿಗೆ ಸುಸ್ವಾಗತ. ಪ್ರತಿಯೊಂದು ಕಲೆಯೂ ಒಂದು ವಿಶಿಷ್ಟ ಕಥೆಯನ್ನು ಹೇಳುತ್ತದೆ! 🎨',
    greeting_en: 'Welcome to the diverse world of Karnataka\'s folk arts. Every piece tells a unique story! 🎨',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Chittara_folk_art_of_Karnataka.jpg',
  },
  {
    id: 'light-sound-show',
    name_kn: 'ಬೆಳಕು ಮತ್ತು ಧ್ವನಿ ಪ್ರದರ್ಶನ',
    name_en: 'Light & Sound Show',
    greeting_kn: 'ಮೈಸೂರು ಅರಮನೆಯು ದೀಪಗಳಿಂದ ಕಂಗೊಳಿಸುವುದನ್ನು ನೋಡಿ! ಈ ಮಾಂತ್ರಿಕ ಪ್ರದರ್ಶನದ ಬಗ್ಗೆ ತಿಳಿಯೋಣ. 🏰💡',
    greeting_en: 'Behold the Mysore Palace as it comes alive with light! Let\'s learn about this magical spectacle. 🏰💡',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Mysore_Palace_Main.jpg',
  }
];

// Fix: Added and exported PALACE_IMAGES to resolve the import error.
export const PALACE_IMAGES: PalaceImage[] = [
  {
    id: 'palace-night',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mysore_Palace_Night.jpg',
    alt_kn: 'ರಾತ್ರಿಯಲ್ಲಿ ಮೈಸೂರು ಅರಮನೆ ದೀಪಾಲಂಕಾರ',
    alt_en: 'Mysore Palace illuminated at night',
  },
  {
    id: 'palace-day',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Mysore_Palace_Main.jpg',
    alt_kn: 'ಹಗಲಿನಲ್ಲಿ ಮೈಸೂರು ಅರಮನೆಯ ಮುಂಭಾಗ',
    alt_en: 'Front view of Mysore Palace during the day',
  },
  {
    id: 'durbar-hall',
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Durbar_Hall_Mysore_Palace.jpg',
    alt_kn: 'ಮೈಸೂರು ಅರಮನೆಯ ದರ್ಬಾರ್ ಹಾಲ್',
    alt_en: 'The Durbar Hall inside Mysore Palace',
  },
  {
    id: 'ambavilasa-hall',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Ambavilasa_Hall_at_Mysore_Palace.jpg',
    alt_kn: 'ಮೈಸೂರು ಅರಮನೆಯ ಅಂಬಾವಿಲಾಸ ಸಭಾಂಗಣ',
    alt_en: 'The Ambavilasa Hall at Mysore Palace',
  },
  {
    id: 'architecture-detail',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Architectural_details_of_the_Mysore_Palace.jpg',
    alt_kn: 'ಮೈಸೂರು ಅರಮನೆಯ ವಾಸ್ತುಶಿಲ್ಪದ ವಿವರಗಳು',
    alt_en: 'Architectural details of the Mysore Palace',
  },
  {
    id: 'jamboo-savari-palace',
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mysore_Dasara_Procession_2013.jpg',
    alt_kn: 'ದಸರಾ ಮೆರವಣಿಗೆಯಲ್ಲಿ ಅರಮನೆಯ ಮುಂದೆ ಜಂಬೂ ಸವಾರಿ',
    alt_en: 'Jamboo Savari procession in front of the palace during Dasara',
  },
];