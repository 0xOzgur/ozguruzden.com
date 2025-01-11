import React, { useState, useEffect } from 'react';
import './Navbar.css';

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
      setMenuOpen(false); // Menüye tıklandığında mobil menüyü kapat
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
      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && 
              scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleRouteChange);
    return () => window.removeEventListener('scroll', handleRouteChange);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="nav-logo" onClick={handleClick}>
          Özgür Üzden
        </a>
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li>
            <a 
              href="#hero" 
              className={`nav-link ${activeLink === 'hero' ? 'active' : ''}`} 
              onClick={handleClick}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activeLink === 'about' ? 'active' : ''}`} 
              onClick={handleClick}
            >
              About Me
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`} 
              onClick={handleClick}
            >
              My Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`} 
              onClick={handleClick}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;