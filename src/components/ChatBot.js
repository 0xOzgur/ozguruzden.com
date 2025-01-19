// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'am AI assistant of Ozgur. How can I help you?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastMessageId, setLastMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Input için ref ekleyelim

  // Input'u aktif tutmak için useEffect ekleyelim
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
}, [messages, isTyping]); // messages veya isTyping değiştiğinde input'u aktif et

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Feedback gönderme fonksiyonu
  const sendFeedback = async (messageId, isPositive) => {
    try {
      await fetch('http://ozguruzden.com/ai-api/feedback', {
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
          <button onClick={() => sendFeedback(id, true)} title="Useful">👍</button>
          <button onClick={() => sendFeedback(id, false)} title="Not Useful">👎</button>
        </div>
      )}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setIsTyping(true);
    setError(null);

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
        const response = await fetch('https://ozguruzden.com/ai-api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: inputMessage,
                chatHistory: messages.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }))
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Bir hata oluştu');
        }

        const data = await response.json();
        
        setMessages(prev => [...prev, {
            text: data.response,
            sender: 'bot'
        }]);

    } catch (error) {
        console.error('Chat error:', error);
        setError(error.message);
        setMessages(prev => [...prev, {
            text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
            sender: 'bot'
        }]);
    } finally {
        setIsTyping(false);
        // Input'a fokus yap
        const inputElement = document.querySelector('.input-form input');
        if (inputElement) {
            inputElement.focus();
        }
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
            <h3>AI Chat Bot</h3>
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
              placeholder="Type your message..."
              //disabled={isTyping}
              aria-label="Message input"
              autoFocus  // Otomatik odaklanma
            />
            <button 
              type="submit" 
              disabled={isTyping}
              aria-label="Send message"
            >
              {isTyping ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;