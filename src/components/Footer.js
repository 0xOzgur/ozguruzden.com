// src/components/Footer.js

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section social-media">
            <h3>Sosyal Medya</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/your-profile/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com/your-instagram-handle/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="footer-section copyright">
            <p>&copy; 2024 Özgür Üzden. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;