// server/learning.js
const fs = require('fs').promises;
const path = require('path');

class LearningSystem {
    constructor() {
        this.learningPath = path.join(__dirname, 'data', 'learned_responses.json');
        this.conversations = [];
        this.loadLearningData();
    }

    async loadLearningData() {
        try {
            const data = await fs.readFile(this.learningPath, 'utf8');
            this.conversations = JSON.parse(data);
        } catch (error) {
            console.log('No existing learning data found. Starting fresh.');
            this.conversations = [];
        }
    }

    async saveLearningData() {
        try {
            await fs.writeFile(this.learningPath, JSON.stringify(this.conversations, null, 2));
        } catch (error) {
            console.error('Error saving learning data:', error);
        }
    }

    async learnFromConversation(message, response, feedback) {
        this.conversations.push({
            message,
            response,
            feedback,
            timestamp: new Date().toISOString()
        });
        await this.saveLearningData();
    }

    findSimilarResponses(message) {
        return this.conversations
            .filter(conv => conv.feedback === 'positive')
            .filter(conv => this.calculateSimilarity(message, conv.message) > 0.7)
            .map(conv => conv.response);
    }

    calculateSimilarity(str1, str2) {
        // Basit benzerlik hesaplama
        const words1 = str1.toLowerCase().split(' ');
        const words2 = str2.toLowerCase().split(' ');
        const commonWords = words1.filter(word => words2.includes(word));
        return commonWords.length / Math.max(words1.length, words2.length);
    }
}

module.exports = new LearningSystem();