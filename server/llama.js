// server/llama.js
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const systemPrompt = `Ben Özgür Üzden'in AI Asistanıyım. Size nasıl yardımcı olabilirim?.
Tech stack: React.js, Node.js, MongoDB, AWS
İletişim: 0xOzgurx@gmail.com, github.com/ozguruzden`;

async function generateLlamaResponse(message, chatHistory = []) {
    try {
        const recentHistory = chatHistory.slice(-3);
        const conversation = formatConversation(recentHistory, message);
        
        const response = await hf.textGeneration({
            model: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',  // Mistral modeli
            inputs: conversation,
            parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                top_p: 0.95,
                repetition_penalty: 1.15,
                do_sample: true,
                max_length: 1024
            }
        });

        let generatedText = response.generated_text.trim();
        
        if (!generatedText || generatedText.length < 10) {
            throw new Error('Invalid response');
        }

        return generatedText;
    } catch (error) {
        console.error('Model API Error:', error);
        throw error;
    }
}

function formatConversation(chatHistory, currentMessage) {
    let formattedPrompt = `<s>[INST] ${systemPrompt} [/INST]</s>\n\n`;
    
    chatHistory.forEach(msg => {
        formattedPrompt += `<s>[INST] ${msg.content} [/INST]</s>\n`;
        if (msg.role === 'assistant') {
            formattedPrompt += `${msg.content}</s>\n`;
        }
    });
    
    formattedPrompt += `<s>[INST] ${currentMessage} [/INST]</s>`;
    
    if (formattedPrompt.length > 800) {
        const messages = formattedPrompt.split('\n');
        formattedPrompt = messages[0] + '\n' + messages.slice(-3).join('\n');
    }
    
    return formattedPrompt;
}

module.exports = { generateLlamaResponse };