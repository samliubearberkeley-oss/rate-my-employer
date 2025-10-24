import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [isClean, setIsClean] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'clean') {
      setIsClean(true);
      document.body.classList.add('clean-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newIsClean = !isClean;
    setIsClean(newIsClean);
    
    if (newIsClean) {
      document.body.classList.add('clean-theme');
      localStorage.setItem('theme', 'clean');
    } else {
      document.body.classList.remove('clean-theme');
      localStorage.setItem('theme', 'sketch');
    }
  };

  return (
    <button 
      className={`theme-switcher ${isClean ? 'clean' : 'sketch'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isClean ? (
        // Sketch icon (hand-drawn)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ) : (
        // Clean icon (precise)
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )}
    </button>
  );
}
