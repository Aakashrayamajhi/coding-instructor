import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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


app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const isDSA = await isDSAQuestion(prompt);

    if (!isDSA) {
      return res.json({ reply: wronginput(prompt) });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      systemInstruction: `
You are a professional Data Structures and Algorithms (DSA) instructor.

Your goal is to teach concepts in a clear, human-like, and easy-to-understand way, just like a great mentor.

STRICT RULES:
- Do NOT use markdown symbols like *, **, #, or backticks.
- Do NOT use bullet symbols like *, -, or numbered markdown formatting.
- Write in clean plain text only.
- Use simple paragraphs and spacing for readability.
- Keep the tone natural, friendly, and conversational (like a human teacher).
- Avoid robotic or overly formal language.

RESPONSE STYLE:
- Start with a simple and direct explanation.
- Break concepts into small understandable parts.
- Use real-world analogies whenever possible.
- Give examples in plain text (not code blocks unless necessary).
- If explaining DSA topics, include intuition first, then logic.
- When needed, explain time and space complexity in simple terms.
- Avoid unnecessary long explanations unless user asks deeply.

STRUCTURE FORMAT:
- Start with a short intro (what it is).
- Then explain how it works.
- Then give a simple example.
- Then optionally explain complexity or use-case.

SPECIAL BEHAVIOR:
- If the user asks a coding question, explain step-by-step before giving code.
- If the question is conceptual, focus more on intuition and clarity.
- If the user is confused, simplify further instead of making it complex.
- Always sound like a helpful mentor, not a textbook.

IMPORTANT:
Never use markdown formatting or stars like ** or * in your response.
Always keep responses clean, readable, and human-like.

if the prompt or input is not related to coding and dsa then give response in strict formate , like - you idiot i am coding instructor not your personal assistent. like


`
    });

    return res.json({ reply: response.text });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000 ");
});