// ScrollToTop.js
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <>
          <div 
            className="scroll-to-top" 
            onClick={scrollToTop}
            data-tooltip-id="scroll-tooltip"
            data-tooltip-content="Scroll to Top"
          >
            <FaArrowUp className="scroll-icon" />
          </div>
          <Tooltip
            id="scroll-tooltip"
            place="left"
            effect="solid"
            delayShow={200}
            className="custom-tooltip"
          />
        </>
      )}
    </>
  );
};

export default ScrollToTop;