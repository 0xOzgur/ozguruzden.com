// server/aiserver.js
const express = require('express');
const cors = require('cors');
const responseDatabase = require('./responses');
const { generateOpenAIResponse } = require('./openai');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const learningSystem = require('./learning');
require('dotenv').config();

const app = express();

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

// Manuel CORS başlıkları
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (corsOptions.origin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // OPTIONS request için hızlı yanıt
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 50 // Her IP için 15 dakikada maksimum 50 istek
});

app.use('/ai-api/', apiLimiter);

// Caching
const responseCache = new NodeCache({ stdTTL: 3600 }); // 1 saat cache süresi

// Mesaj geçmişi
const messageHistory = new Map();

// Dil algılama fonksiyonu
const detectLanguage = (text) => {
    const turkishChars = 'ğüşıöçĞÜŞİÖÇ';
    return turkishChars.split('').some(char => text.includes(char)) ? 'tr' : 'en';
};

// Fallback yanıt oluşturma
const getFallbackResponse = (message) => {
    if (!message) {
        return responseDatabase.default.en;
    }
    
    const lang = detectLanguage(message);
    const lowercaseMessage = message.toLowerCase();
    
    // Try to find a matching category
    for (const category in responseDatabase) {
        if (category === 'default') continue;
        
        const categoryData = responseDatabase[category];
        if (categoryData.keywords && 
            categoryData.keywords.some(keyword => lowercaseMessage.includes(keyword.toLowerCase()))) {
            return categoryData[lang] || categoryData['en']; // Fallback to English if translation not available
        }
    }
    
    // Return default response if no match found
    return responseDatabase.default[lang] || responseDatabase.default['en'];
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
        
        // First try to get a relevant response based on keywords
        let errorResponse = getFallbackResponse(req.body.message || '');
        
        // If that fails, use a default error message
        if (!errorResponse) {
            errorResponse = lang === 'tr' 
                ? "Şu anda teknik bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin."
                : "I'm currently experiencing technical difficulties. Please try again later.";
        }

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
        
        // Son mesaj ve yanıtı al
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
        environment: process.env.NODE_ENV || 'development'
    });
});

// Metrics endpoint'i (basit kullanım istatistikleri)
app.get('/ai-api/metrics', (req, res) => {
    res.json({
        totalConversations: messageHistory.size,
        cacheSize: responseCache.getStats().keys,
        uptime: process.uptime()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`AI Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Performing graceful shutdown...');
    // Cache ve geçmişi kaydet
    learningSystem.saveLearningData();
    process.exit(0);
});

module.exports = app;