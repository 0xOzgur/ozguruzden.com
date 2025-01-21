const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
//const PORT = process.env.MAIL_SERVER_PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://ozguruzden.com', 'https://www.ozguruzden.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// Test endpoint
app.get('/mail-api', (req, res) => {
    console.log('Test endpoint hit!');
    try {
        res.json({ message: 'API is working!' });
    } catch (error) {
        console.error('Error in test endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Basic test endpoint
app.get('/mail-api/test', (req, res) => {
    console.log('Basic test endpoint hit!');
    try {
        res.json({ message: 'Basic test endpoint is working!' });
    } catch (error) {
        console.error('Error in basic test endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Email endpoint
app.post('/mail-api/send-email', async (req, res) => {
    console.log('Email endpoint hit!');
    
    try {
        // Request body kontrolü
        if (!req.body) {
            console.log('No request body received');
            return res.status(400).json({ success: false, message: 'Request body is missing' });
        }

        console.log('Request body:', req.body);
        
        const { name, email, subject, message } = req.body;

        // Gerekli alanların kontrolü
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email transporter oluştur
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true,
            logger: true
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

        console.log('Attempting to send email...');
        
        // Email gönder
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        
        return res.status(200).json({ 
            success: true, 
            message: 'Email başarıyla gönderildi!' 
        });
    } catch (error) {
        console.error('Error in email endpoint:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Email gönderilirken bir hata oluştu',
            error: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error', 
        error: err.message 
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET /mail-api');
    console.log('- GET /mail-api/test');
    console.log('- POST /mail-api/send-email');
});