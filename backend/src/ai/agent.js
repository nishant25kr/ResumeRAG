import { GoogleGenAI } from "@google/genai";

async function embedding(testInput) {

    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: [testInput],
    });

    return response.embeddings

}

export default embedding