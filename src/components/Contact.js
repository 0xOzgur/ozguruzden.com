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
      console.log('Sending email request...');
      const response = await fetch('https://193.233.115.42:3001/api/send-email', {

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
        setSuccess('Mesajınız başarıyla gönderildi!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error(result.message || 'Bilinmeyen bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error details:', error);
      setSuccess(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  const testApi = async () => {
    try {
      // Test GET request
      console.log('Testing GET endpoint...');
      const testResponse = await fetch('https://ozguruzden.com/api/test', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include'
      });
      console.log('Test GET response:', await testResponse.json());

      // Test POST request
      console.log('Testing POST endpoint...');
      const testPostResponse = await fetch('https://ozguruzden.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'Test Message'
        })
      });
      console.log('Test POST response:', await testPostResponse.json());
    } catch (error) {
      console.error('Test failed:', error);
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
            <p>Address: Ayvalık, Türkiye</p>
            {success && <p className="message">{success}</p>}
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
            <button type="button" onClick={testApi}>
              Test API Connection
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;