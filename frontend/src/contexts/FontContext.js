import { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export function FontProvider({ children }) {
  const [isNounsFont, setIsNounsFont] = useState(false);

  const toggleFont = () => {
    setIsNounsFont(prev => !prev);
  };

  return (
    <FontContext.Provider value={{ isNounsFont, toggleFont }}>
      <div style={{ fontFamily: isNounsFont ? 'Nouns, sans-serif' : 'inherit' }}>
        {children}
      </div>
    </FontContext.Provider>
  );
}

export const useFont = () => useContext(FontContext); 