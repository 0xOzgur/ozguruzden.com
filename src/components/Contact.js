// src/components/Contact.js

import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    try {
      const response = await fetch('https://ozguruzden.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSuccess('Mesajınız başarıyla gönderildi!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error(result.message || 'Bilinmeyen bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setSuccess(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Contact</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Me</h3>
            <p>Email: ozgur@orfion.com.tr </p>
            <p>Phone: +90 555 879 09 56</p>
            <p>Address: Ayvalık, Türkiye</p>
            {success && <p>{success}</p>}
            <h3>Social Media</h3>
            <div className="social-links">
            <a href="https://x.com/ozguruzden" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="3x" />
              </a>
              <a href="https://www.linkedin.com/in/ozguruzden/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="3x" />
              </a>
              <a href="https://github.com/0xOzgur" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="3x" />
              </a>
              <a href="https://www.instagram.com/ozgurzdn/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="3x" />
              </a>
              <a href="https://medium.com/@ozgur.uzden" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faMedium} size="3x" />
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit" disabled={sending}>
              {sending ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;