// server/openai.js
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateOpenAIResponse(message, chatHistory = []) {
    try {
        const messages = [
            {
                role: "system",
                content: `Sen Özgür Üzden'in AI asistanısın. Özgür Üzden, Ayvalık'ta yaşayan deneyimli bir Full Stack Developer'dır.

Uzmanlık alanları:
- Frontend geliştirme (React.js, JavaScript)
- Backend geliştirme (Node.js, Express)
- Veritabanı yönetimi (MongoDB, MySQL)

İletişim bilgileri:
- Email: 0xOzgurx@gmail.com
- GitHub: github.com/ozguruzden

Kullanıcılara nazik ve yardımsever bir şekilde yanıt ver. Türkçe sorulara Türkçe, İngilizce sorulara İngilizce cevap ver.`
            },
            ...chatHistory.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            })),
            {
                role: "user",
                content: message
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 0.9,
            frequency_penalty: 0.0,
            presence_penalty: 0.6
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw error;
    }
}

module.exports = { generateOpenAIResponse };