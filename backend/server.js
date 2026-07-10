import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.options(/.*/, cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  console.log("Chat request received:", prompt.substring(0, 50) + "...");
  
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 2048,
    });
    console.log("Chat response sent successfully");
    res.json({ text: response.choices[0].message.content });
  } catch (err) {
    console.error("Chat Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
