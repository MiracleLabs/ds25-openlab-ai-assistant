import express from "express";
import cors from "cors";
const app = express();
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cors());
let chatHistories = new Map();

app.post("/api/chat", async (req, res) => {
  try {
    console.log("In........");

    const { prompt, sessionId: incomingSessionId } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ message: "Prompt is required" });
    }

    let sessionId = incomingSessionId || uuidv4();
    const messages = chatHistories.get(sessionId) || [];

    messages.push({
      role: "user",
      content: prompt,
    });

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages,
    });

    messages.push({
      role: "assistant",
      content: result.text,
    });

    chatHistories.set(sessionId, messages);

    return res.status(200).json({
      response: result.text,
      sessionId,
      messages,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to get response",
        error: error?.message,
      });
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
