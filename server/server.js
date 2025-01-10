const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://ozguruzden.com', 'http://ozguruzden.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Test endpoint
app.get('/test', (req, res) => {
    console.log('Test endpoint hit!');
    res.json({ message: 'API is working!' });
});

// Email endpoint
app.post('/send-email', async (req, res) => {
    console.log('Email endpoint hit with data:', {
        body: req.body,
        headers: req.headers
    });
    
    const { name, email, subject, message } = req.body;

    try {
        // Email transporter oluştur
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email içeriği
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: `Yeni İletişim Formu Mesajı: ${subject}`,
            text: `
                Yeni bir mesaj aldınız:
                
                İsim: ${name}
                Email: ${email}
                Konu: ${subject}
                
                Mesaj:
                ${message}
            `,
            html: `
                <h3>Yeni bir mesaj aldınız</h3>
                <p><strong>İsim:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Konu:</strong> ${subject}</p>
                <p><strong>Mesaj:</strong></p>
                <p>${message}</p>
            `
        };

        // Email gönder
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.json({ success: true, message: 'Email başarıyla gönderildi!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Email gönderilirken bir hata oluştu',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET /test');
    console.log('- POST /send-email');
});