import React, { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cursorRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const typeDelay = isMobile ? 100 : 50;

    const typeWriter = (text, element, delay, callback) => {
      return new Promise((resolve) => {
        if (!element.current) {
          resolve();
          return;
        }

        let i = 0;
        element.current.style.minHeight = `${element.current.offsetHeight}px`;
        
        const interval = setInterval(() => {
          if (!element.current) {
            clearInterval(interval);
            resolve();
            return;
          }
          
          if (i < text.length) {
            element.current.innerHTML = text.substring(0, i + 1);
            updateCursorPosition(element.current);
            i++;
          } else {
            clearInterval(interval);
            if (callback) callback();
            resolve();
          }
        }, delay);
      });
    };

    const titleText = "Hello, I'm";
    const subtitleText = "Özgür Üzden";
    const descriptionText = "Full Stack Developer & Blockchain Developer";

    const startTyping = async () => {
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!titleRef.current || !subtitleRef.current || !descriptionRef.current) {
        return;
      }

      try {
        await typeWriter(titleText, titleRef, typeDelay);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await typeWriter(subtitleText, subtitleRef, typeDelay);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await typeWriter(descriptionText, descriptionRef, typeDelay);
        
        if (buttonRef.current) {
          setTimeout(() => {
            buttonRef.current?.classList.remove('fade-out');
            buttonRef.current?.classList.add('fade-in');
          }, 500);
        }
      } catch (error) {
        console.error('Error in typing animation:', error);
      }
    };

    // Start typing with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      startTyping();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const updateCursorPosition = (element) => {
    if (!cursorRef.current || !element) return;
    
    try {
      const rect = element.getBoundingClientRect();
      cursorRef.current.style.height = `${rect.height}px`;
      cursorRef.current.style.top = `${rect.top + window.scrollY}px`;
      cursorRef.current.style.left = `${rect.right + window.scrollX}px`;
    } catch (error) {
      console.error('Error updating cursor position:', error);
    }
  };

  const handleButtonClick = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="hero-title" ref={titleRef}></h2>
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h1 className="hero-subtitle" ref={subtitleRef}></h1>
        <p className="hero-description" ref={descriptionRef}></p>
        <span className="cursor" ref={cursorRef}></span>
        <button 
          ref={buttonRef} 
          className="hero-button fade-out" 
          onClick={handleButtonClick}
        >
          <span>Let's Meet</span>
          <div className="button-arrow">
            <i className="fas fa-arrow-down"></i>
          </div>
        </button>
      </div>
      <div className="hero-background">
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
      </div>
    </section>
  );
}

export default Hero;