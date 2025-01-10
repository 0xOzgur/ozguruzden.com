// server.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['https://ozguruzden.com', 'https://www.ozguruzden.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Test endpoint'i
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ message: 'API is working!' });
});

// E-posta gönderme endpoint'i
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Received request:', { name, email, subject, message });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `
        Yeni bir mesaj aldınız:

        Gönderen: ${name}
        Email: ${email}

        Konu: ${subject}

        Mesaj:
        ${message}
      `,
      sender: `"${name}" <${email}>`,
      replyTo: email
    };

    console.log('Mail Options:', mailOptions);

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email gönderilirken hata oluştu:', error);
    res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
  }
});

// Hata yönetimi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// 404 hata yönetimi
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send("Sayfa bulunamadı");
});

// Her isteği loglama
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Sunucu dinleme
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
    PORT: process.env.PORT || 3001
  });
});