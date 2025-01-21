const express = require('express');
const cors = require('cors');
const { generateOpenAIResponse } = require('./openai');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const learningSystem = require('./learning');
require('dotenv').config();

const app = express();
const PORT = process.env.AI_SERVER_PORT || 5000;

// Trust proxy ayarı (Nginx arkasında çalıştığı için)
app.set('trust proxy', 1);

// CORS options
const corsOptions = {
    origin: [
        'https://ozguruzden.com',
        'https://www.ozguruzden.com',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// CORS middleware'ini options ile kullanın
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 50, // Her IP için 15 dakikada maksimum 50 istek
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/ai-api/', apiLimiter);

// Caching
const responseCache = new NodeCache({ stdTTL: 3600 }); // 1 saat cache süresi

// Mesaj geçmişi
const messageHistory = new Map();

// Varsayılan yanıtlar
const defaultResponses = {
    greeting: {
        keywords: ['hello', 'hi', 'hey', 'merhaba', 'selam'],
        en: "Hello! I'm Ozgur's AI assistant. How can I help you today?",
        tr: "Merhaba! Ben Özgür'ün AI asistanıyım. Size nasıl yardımcı olabilirim?"
    },
    contact: {
        keywords: ['contact', 'email', 'reach', 'iletişim', 'mail', 'ulaş'],
        en: "You can contact Ozgur via email at 0xOzgurx@gmail.com or check out his GitHub profile at github.com/ozguruzden",        tr: "Özgür'e 0xOzgurx@gmail.com adresinden ulaşabilir veya github.com/ozguruzden adresinden GitHub profilini inceleyebilirsiniz"
    },
    skills: {
        keywords: ['skills', 'experience', 'work', 'deneyim', 'tecrübe', 'yetenek'],
        en: "Ozgur is a Full Stack Developer with expertise in React.js, Node.js, Express, MongoDB, and MySQL. He's currently based in Ayvalık.",
        tr: "Özgür, React.js, Node.js, Express, MongoDB ve MySQL konularında uzman bir Full Stack Developer'dır. Şu anda Ayvalık'ta yaşamaktadır."
    },
    default: {
        en: "I apologize, but I'm currently experiencing some technical difficulties. Please try asking about Ozgur's contact information or his work.",
        tr: "Özür dilerim, şu anda teknik bir sorun yaşıyorum. Lütfen Özgür'ün iletişim bilgileri veya çalışmaları hakkında soru sormayı deneyin."
    }
};

// Dil algılama fonksiyonu
const detectLanguage = (text) => {
    const turkishChars = 'ğüşıöçĞÜŞİÖÇ';
    return turkishChars.split('').some(char => text.includes(char)) ? 'tr' : 'en';
};

// Fallback yanıt oluşturma
const getFallbackResponse = (message) => {
    if (!message) {
        return defaultResponses.default.en;
    }
    
    const lang = detectLanguage(message);
    const lowercaseMessage = message.toLowerCase();
    
    // Try to find a matching category
    for (const category in defaultResponses) {
        if (category === 'default') continue;
        
        const categoryData = defaultResponses[category];
        if (categoryData.keywords && 
            categoryData.keywords.some(keyword => lowercaseMessage.includes(keyword.toLowerCase()))) {
            return categoryData[lang] || categoryData['en'];
        }
    }
    
    // Return default response if no match found
    return defaultResponses.default[lang] || defaultResponses.default['en'];
};

// Ana chat endpoint'i
app.post('/ai-api/chat', async (req, res) => {
    try {
        const { message, chatHistory } = req.body;
        console.log('\n=== New Message ===');
        console.log('Received message:', message);
        console.log('Language:', detectLanguage(message));

        if (!message.trim()) {
            throw new Error('empty_message');
        }

        // Cache kontrolü
        const cacheKey = `${message}-${JSON.stringify(chatHistory)}`;
        const cachedResponse = responseCache.get(cacheKey);
        if (cachedResponse) {
            console.log('Cache hit! Sending cached response:', cachedResponse);
            return res.json({ 
                response: cachedResponse,
                messageId: Date.now().toString()
            });
        }

        let response;
        try {
            // Öğrenilmiş yanıtları kontrol et
            const learnedResponses = learningSystem.findSimilarResponses(message);
            if (learnedResponses.length > 0) {
                console.log('Found learned response');
                response = learnedResponses[0];
            } else {
                // OpenAI ile yanıt alma
                console.log('Attempting to get OpenAI response...');
                response = await generateOpenAIResponse(message, chatHistory);
                console.log('OpenAI Response:', response);
            }
        } catch (modelError) {
            console.error('Model Error:', modelError);
            console.log('Falling back to predefined responses...');
            response = getFallbackResponse(message);
            console.log('Fallback Response:', response);
        }

        if (!response || response.trim() === '') {
            console.log('Empty response, using fallback...');
            response = getFallbackResponse(message);
            console.log('Fallback Response:', response);
        }

        // Yanıtı kaydet
        const messageId = Date.now().toString();
        messageHistory.set(messageId, {
            message: message,
            response: response,
            timestamp: new Date()
        });

        // 1 saat sonra geçmişten sil
        setTimeout(() => {
            messageHistory.delete(messageId);
        }, 3600000);

        // Yanıtı cache'le
        responseCache.set(cacheKey, response);
        console.log('Response cached for future use');
        console.log('=== End of Transaction ===\n');

        res.json({ 
            response,
            messageId 
        });

    } catch (error) {
        console.error('Error:', error);
        const lang = detectLanguage(req.body.message || '');
        const errorResponse = getFallbackResponse(req.body.message || '');

        console.log('Error Response:', errorResponse);
        console.log('=== End of Transaction (Error) ===\n');

        res.status(error.message === 'empty_message' ? 400 : 500)
            .json({ 
                response: errorResponse,
                error: true
            });
    }
});

// Feedback endpoint'i
app.post('/ai-api/feedback', async (req, res) => {
    try {
        const { messageId, feedback } = req.body;
        const conversation = messageHistory.get(messageId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Öğrenme sistemine kaydet
        await learningSystem.learnFromConversation(
            conversation.message,
            conversation.response,
            feedback
        );

        console.log(`Feedback received for message ${messageId}: ${feedback}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Sağlık kontrolü endpoint'i
app.get('/ai-api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Test endpoint'i (sadece development ortamında)
if (process.env.NODE_ENV === 'development') {
    app.get('/ai-api/test', async (req, res) => {
        try {
            const testMessage = "Hello, this is a test message";
            const response = await generateOpenAIResponse(testMessage, []);
            res.json({ 
                success: true, 
                message: testMessage,
                response: response 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    const lang = detectLanguage(req.body?.message || '');
    
    res.status(err.status || 500).json({
        response: lang === 'tr' 
            ? "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin."
            : "Sorry, an error occurred. Please try again later.",
        error: true
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist'
    });
});

// Graceful shutdown işlemleri
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Starting graceful shutdown...');
    
    // Öğrenme verilerini kaydet
    learningSystem.saveLearningData();
    
    // Cache'i temizle
    responseCache.close();
    
    // Mesaj geçmişini temizle
    messageHistory.clear();
    
    // Sunucuyu kapat
    server.close(() => {
        console.log('Server closed. Process will exit now.');
        process.exit(0);
    });

    // Eğer 10 saniye içinde kapanmazsa zorla kapat
    setTimeout(() => {
        console.log('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

const PORT = process.env.PORT || 5000;

// Sunucuyu başlat
const server = app.listen(PORT, () => {
    console.log(`AI Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('No existing learning data found. Starting fresh.');
});

// Graceful shutdown sinyallerini dinle
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Yakalanmamış hataları yakala
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown();
});