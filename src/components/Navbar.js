// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          setActiveLink(link.textContent);
        }
      });
    };

    window.addEventListener('popstate', handleRouteChange);

    // Sayfa ilk yüklendiğinde çalışacak
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="nav-logo">Özgür Üzden</a>
        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li>
            <a href="#hero" className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} onClick={handleClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={`nav-link ${activeLink === 'About Me' ? 'active' : ''}`} onClick={handleClick}>
              About Me
            </a>
          </li>
          <li>
            <a href="#projects" className={`nav-link ${activeLink === 'My Projects' ? 'active' : ''}`} onClick={handleClick}>
              My Projects
            </a>
          </li>
          <li>
            <a href="#contact" className={`nav-link ${activeLink === 'Contact' ? 'active' : ''}`} onClick={handleClick}>
              Contact
            </a>
          </li>
        </ul>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;