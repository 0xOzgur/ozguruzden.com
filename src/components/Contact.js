import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faTwitter, faMedium, faTelegram, faUpwork } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const apiUrl = 'https://ozguruzden.com/mail-api/send-email';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    try {
      console.log('Sending email request...');
      const response = await fetch(`${apiUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, subject, message }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        setSuccess('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error(result.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Error details:', error);
      setSuccess(error.message || 'An error occurred. Please try again.');
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
            <p>Email: ozgur@orfion.com.tr</p>
            <p>Phone: +90 555 879 09 56</p>
            <p>Address: Ayvalık, Turkey</p>
            {success && <p className={`message ${success.includes('successfully') ? 'success' : 'error'}`}>{success}</p>}
            &nbsp;
            <h3>Social Profiles</h3>
            You can contact me via my social profile links below:
            <div className="social-links">
  <a href="https://telegram.me/OxOzgur" target="_blank" rel="noopener noreferrer" data-tooltip="Telegram">
    <FontAwesomeIcon icon={faTelegram} size="3x" className="social-icon" />
  </a>
  <a href="https://x.com/ozguruzden" target="_blank" rel="noopener noreferrer" data-tooltip="Twitter">
    <FontAwesomeIcon icon={faTwitter} size="3x" className="social-icon" />
  </a>
  <a href="https://www.linkedin.com/in/ozguruzden/" target="_blank" rel="noopener noreferrer" data-tooltip="LinkedIn">
    <FontAwesomeIcon icon={faLinkedin} size="3x" className="social-icon" />
  </a>
  <a href="https://github.com/0xOzgur" target="_blank" rel="noopener noreferrer" data-tooltip="GitHub">
    <FontAwesomeIcon icon={faGithub} size="3x" className="social-icon" />
  </a>
  <a href="https://www.instagram.com/ozgurzdn/" target="_blank" rel="noopener noreferrer" data-tooltip="Instagram">
    <FontAwesomeIcon icon={faInstagram} size="3x" className="social-icon" />
  </a>
  <a href="https://medium.com/@ozgur.uzden" target="_blank" rel="noopener noreferrer" data-tooltip="Medium">
    <FontAwesomeIcon icon={faMedium} size="3x" className="social-icon" />
  </a>
  <a href="https://www.upwork.com/freelancers/ozguruzden" target="_blank" rel="noopener noreferrer" data-tooltip="Upwork">
    <FontAwesomeIcon icon={faUpwork} size="3x" className="social-icon" />
  </a>
</div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="form-textarea"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={sending}
              className={`submit-button ${sending ? 'sending' : ''}`}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;