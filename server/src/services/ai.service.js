import { GoogleGenAI } from "@google/genai";


async function invokeGeminiAi() {
    try{
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
        
        const response = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: "Explain how AI works in a few words",
        });
        
        console.log(response.output_text);
                
    }catch(err){
        console.log("AI Model or API key for ai service is experiencing a problem")
    }
}

export default invokeGeminiAi


