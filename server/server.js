// server.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// E-posta kimlik bilgilerini ortam değişkenlerinden alalım
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// E-posta gönderme endpoint'i
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      headers: {
        'X-Mailer': 'Nodemailer'
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: EMAIL_USER,
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
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email gönderilirken hata oluştu:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

// Hata yönetimi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// 404 hata yönetimi
app.use((req, res, next) => {
  res.status(404).send("Sayfa bulunamadı");
});

// Sunucu dinleme
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Her isteği loglama
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});