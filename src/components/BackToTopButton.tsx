'use client';

import { useState, useEffect } from 'react';

// A simple, self-contained SVG icon for the arrow
const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5"></path>
    <path d="M5 12l7-7 7 7"></path>
  </svg>
);

export default function BackToTopButton() {
  // State to track whether the button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // This function will be called when the user scrolls
  const toggleVisibility = () => {
    // If the user has scrolled down more than 300 pixels, show the button
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // This function will be called when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll smooth and animated
    });
  };

  // This effect adds the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // This is a cleanup function that removes the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        // This uses Tailwind classes to conditionally show or hide the button
        // with a smooth fade-in/fade-out transition.
        className={`
          bg-brand-blue hover:bg-brand-medium-blue 
          text-white 
          p-3 
          rounded-full 
          shadow-lg 
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="Go to top"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}
