import React from 'react';
import { Language } from '../types';

interface AboutPageProps {
  language: Language;
}

const UI_STRINGS = {
  kn: {
    title: 'ಮೈಸೂರು ದಸರಾ ಬಗ್ಗೆ',
    p1: 'ಮೈಸೂರು ದಸರಾ ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಾಡಹಬ್ಬವಾಗಿದೆ. ಇದು 10 ದಿನಗಳ ಕಾಲ ನಡೆಯುವ ಹಬ್ಬವಾಗಿದ್ದು, ನವರಾತ್ರಿಯಿಂದ ಪ್ರಾರಂಭವಾಗಿ ವಿಜಯದಶಮಿಯ ದಿನದಂದು ಕೊನೆಗೊಳ್ಳುತ್ತದೆ. ಈ ಹಬ್ಬವು ಕೆಟ್ಟದ್ದರ ಮೇಲೆ ಒಳ್ಳೆಯದರ ವಿಜಯವನ್ನು ಸಂಕೇತಿಸುತ್ತದೆ, ಏಕೆಂದರೆ ಈ ದಿನದಂದು ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯು ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದಳು ಎಂದು ಪುರಾಣಗಳು ಹೇಳುತ್ತವೆ.',
    p2: 'ಈ ಹಬ್ಬವನ್ನು 15ನೇ ಶತಮಾನದಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಅರಸರು ಪ್ರಾರಂಭಿಸಿದರು. ನಂತರ ಮೈಸೂರಿನ ಒಡೆಯರ್ ಅರಸರು ಈ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರೆಸಿದರು. ಇಂದಿಗೂ, ಈ ಹಬ್ಬವು ರಾಜಮನೆತನದ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸಂಭ್ರಮಗಳ ಅದ್ಭುತ ಮಿಶ್ರಣವಾಗಿದೆ.',
    p3: 'ದಸರಾದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆ ಜಂಬೂ ಸವಾರಿ. ಇದು ವಿಜಯದಶಮಿಯ ದಿನದಂದು ನಡೆಯುವ ಭವ್ಯ ಮೆರವಣಿಗೆಯಾಗಿದ್ದು, ಅಲಂಕೃತ ಆನೆಗಳ ಮೇಲೆ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ವಿಗ್ರಹವನ್ನು ಹೊತ್ತು ಸಾಗಲಾಗುತ್ತದೆ. ಇದರೊಂದಿಗೆ ವಿವಿಧ ಜಾನಪದ ಕಲಾ ತಂಡಗಳು, ಸಂಗೀತಗಾರರು ಮತ್ತು ನೃತ್ಯಗಾರರು ಭಾಗವಹಿಸುತ್ತಾರೆ. ಮೈಸೂರು ಅರಮನೆಯು ಲಕ್ಷಾಂತರ ದೀಪಗಳಿಂದ ಅಲಂಕೃತಗೊಂಡು ನೋಡುಗರ ಕಣ್ಮನ ಸೆಳೆಯುತ್ತದೆ.',
    furtherReadingTitle: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ',
    link1: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ',
    link2: 'ಮೈಸೂರು ದಸರಾ ಅಧಿಕೃತ ಜಾಲತಾಣ',
    link3: 'ಇನ್ಕ್ರೆಡಿಬಲ್ ಇಂಡಿಯಾ',
  },
  en: {
    title: 'About Mysore Dasara',
    p1: 'Mysore Dasara is the state festival of Karnataka, India. It is a 10-day festival, starting with Navaratri and concluding on Vijayadashami day. The festival symbolizes the victory of good over evil, marking the day when the Goddess Chamundeshwari killed the demon Mahishasura.',
    p2: 'The festival was first started by the Vijayanagara kings in the 15th century. Later, the tradition was continued by the Wodeyars of Mysore. To this day, the festival is a grand blend of royal traditions and public celebrations.',
    p3: 'The main attraction of Dasara is the Jamboo Savari (Elephant Procession). This is a grand procession held on Vijayadashami, where an idol of the Goddess Chamundeshwari is carried atop a decorated elephant. It is accompanied by various folk art troupes, musicians, and dancers. The Mysore Palace is illuminated with nearly 100,000 light bulbs, creating a breathtaking sight.',
    furtherReadingTitle: 'Further Reading',
    link1: 'Karnataka Tourism',
    link2: 'Official Mysore Dasara Website',
    link3: 'Incredible India',
  }
};

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const strings = UI_STRINGS[language];

  return (
    <div className="w-full max-w-4xl px-4 py-8 text-white">
       <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold md:text-6xl" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
          {strings.title}
        </h1>
      </header>
      <div className="bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg space-y-6 text-lg leading-relaxed">
        <p>{strings.p1}</p>
        <p>{strings.p2}</p>
        <p>{strings.p3}</p>
      </div>

      <div className="mt-8 bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-amber-100" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>{strings.furtherReadingTitle}</h2>
        <ul className="space-y-3 list-disc list-inside text-lg">
          <li>
            <a href="https://www.karnatakatourism.org/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-100 hover:underline transition-colors">
              {strings.link1}
            </a>
          </li>
          <li>
            <a href="https://mysoredasara.gov.in/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-100 hover:underline transition-colors">
              {strings.link2}
            </a>
          </li>
           <li>
            <a href="https://www.incredibleindia.org/content/incredible-india-v2/en/destinations/mysore/dasara-festival.html" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-100 hover:underline transition-colors">
              {strings.link3}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;