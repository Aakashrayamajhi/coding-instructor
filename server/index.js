import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function wronginput(userInput) {
  return `Not a DSA question: ${userInput}, I only answer DSA-related questions.`;
}


async function isDSAQuestion(input) {
  const res = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Is the following question related to Data Structures and Algorithms (DSA)? 
Answer ONLY "YES" or "NO".

Question: ${input}`
  });

  const answer = res.text.trim().toUpperCase();
  return answer.includes("YES");
}


async function main() {
  const userInput = "hi what is dsa";

  try {
    
    const isDSA = await isDSAQuestion(userInput);

    if (!isDSA) {
      
      console.log(wronginput(userInput));
      return;
    }

  
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",

      contents: [
        {
          role: "user",
          parts: [{ text: userInput }]
        }
      ],

      systemInstruction: `
You are a DSA instructor.
Explain concepts clearly with examples.
`
    });

    console.log(response.text);

  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

main();