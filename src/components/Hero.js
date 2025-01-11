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
      let i = 0;
      element.current.style.minHeight = `${element.current.offsetHeight}px`;
      
      const interval = setInterval(() => {
        if (i < text.length) {
          element.current.innerHTML = text.substring(0, i + 1);
          updateCursorPosition(element.current);
          i++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, delay);

      return () => clearInterval(interval);
    };

    const titleText = "Hello, I'm";
    const subtitleText = "Özgür Üzden";
    const descriptionText = "Full Stack Developer & Blockchain Developer";

    let titleTyping, subtitleTyping, descriptionTyping;

    const startTyping = () => {
      titleTyping = typeWriter(titleText, titleRef, typeDelay, () => {
        setTimeout(() => {
          subtitleTyping = typeWriter(subtitleText, subtitleRef, typeDelay, () => {
            setTimeout(() => {
              descriptionTyping = typeWriter(descriptionText, descriptionRef, typeDelay, () => {
                setTimeout(() => {
                  if (buttonRef.current) {
                    buttonRef.current.classList.remove('fade-out');
                    buttonRef.current.classList.add('fade-in');
                  }
                }, 500);
              });
            }, 500);
          });
        }, 500);
      });
    };

    startTyping();

    return () => {
      // Cleanup intervals if component unmounts
      if (titleTyping) clearInterval(titleTyping);
      if (subtitleTyping) clearInterval(subtitleTyping);
      if (descriptionTyping) clearInterval(descriptionTyping);
    };
  }, []);

  const updateCursorPosition = (element) => {
    if (cursorRef.current) {
      const rect = element.getBoundingClientRect();
      cursorRef.current.style.height = `${rect.height}px`;
      cursorRef.current.style.top = `${rect.top + window.scrollY}px`;
      cursorRef.current.style.left = `${rect.right + window.scrollX}px`;
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
        <h2 className="hero-title" ref={titleRef}></h2>
        <h1 className="hero-subtitle" ref={subtitleRef}></h1>
        <p className="hero-description" ref={descriptionRef}></p>
        <span className="cursor" ref={cursorRef}></span>
        <button 
          ref={buttonRef} 
          className="hero-button fade-out" 
          onClick={handleButtonClick}
        >
          <span>Let's Meet</span>
          <div className="button-ripple"></div>
          <div className="button-arrow">
            <i className="fas fa-arrow-right"></i>
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