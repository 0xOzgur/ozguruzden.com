import React, { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cursorRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const typeWriter = (text, element, delay, callback) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          element.current.innerHTML = text.substring(0, i + 1);
          updateCursorPosition(element.current);
          i++;
        } else {
          clearInterval(interval);
          callback();
        }
      }, delay);
    };

    const titleText = "Hello, I'm Özgür Üzden";
    const subtitleText = "Full Stack Developer";
    const descriptionText = "Crafting innovative web experiences with passion and precision.";

    typeWriter(titleText, titleRef, 50, () => {
      setTimeout(() => {
        typeWriter(subtitleText, subtitleRef, 50, () => {
          setTimeout(() => {
            typeWriter(descriptionText, descriptionRef, 50, () => {
              setTimeout(() => {
                buttonRef.current.classList.remove('fade-out');
                buttonRef.current.classList.add('fade-in');
              }, 1000);
            });
          }, 1000);
        });
      }, 1000);
    });
  }, []);

  const updateCursorPosition = (element) => {
    const rect = element.getBoundingClientRect();
    cursorRef.current.style.height = `${rect.height}px`;
    cursorRef.current.style.top = `${rect.top + window.scrollY}px`;
    cursorRef.current.style.left = `${rect.right + window.scrollX}px`;
  };

  const handleButtonClick = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <h2 className="hero-title" ref={titleRef}>0xOzgur</h2>
        <h1 className="hero-subtitle" ref={subtitleRef}>Özgür Üzden</h1>
        <p className="hero-description" ref={descriptionRef}></p>
        <span className="cursor" ref={cursorRef}></span>
        <button ref={buttonRef} className="hero-button fade-out" onClick={handleButtonClick}>
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