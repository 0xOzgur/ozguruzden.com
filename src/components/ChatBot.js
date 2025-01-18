// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Merhaba! Ben Özgür'ün AI asistanıyım. Size nasıl yardımcı olabilirim?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastMessageId, setLastMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Feedback gönderme fonksiyonu
  const sendFeedback = async (messageId, isPositive) => {
    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          feedback: isPositive ? 'positive' : 'negative'
        }),
      });

      // Feedback butonlarını gizle
      setLastMessageId(null);
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  // Mesaj komponenti
  const MessageComponent = ({ message, id }) => (
    <div className={`message-container ${message.sender}`}>
      <div className={`message ${message.sender}`}>
        {message.text}
      </div>
      {message.sender === 'bot' && id === lastMessageId && (
        <div className="feedback-buttons">
          <button onClick={() => sendFeedback(id, true)} title="Yararlı">👍</button>
          <button onClick={() => sendFeedback(id, false)} title="Yararlı Değil">👎</button>
        </div>
      )}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setError(null);

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          chatHistory: chatHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Sunucu yanıt vermedi');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        text: data.response,
        sender: 'bot'
      }]);

      // Son bot mesajı için ID'yi kaydet
      setLastMessageId(messages.length + 1);

    } catch (error) {
      console.error('Error:', error);
      setError('Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.');
      setMessages(prev => [...prev, {
        text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Enter tuşu ile gönderme
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button 
        className="chat-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AI Asistan</h3>
          </div>
          
          <div className="messages-container">
            {messages.map((message, index) => (
              <MessageComponent 
                key={index} 
                message={message} 
                id={index}
              />
            ))}
            {isTyping && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..."
              disabled={isTyping}
              aria-label="Message input"
            />
            <button 
              type="submit" 
              disabled={isTyping}
              aria-label="Send message"
            >
              {isTyping ? '...' : 'Gönder'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;