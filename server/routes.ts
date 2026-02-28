import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.ideas.analyze.path, async (req, res) => {
    try {
      const input = api.ideas.analyze.input.parse(req.body);
      
      const prompt = `You are an expert business idea validator for Indian entrepreneurs.
      A user has shared their startup idea: "${input.description}"
      
      Please analyze this idea and provide a JSON response strictly following this format:
{
  "marketCompetition": "Assess market competition and saturation level in India.",
  "targetAudience": "Identify the target audience and suggest alternative markets if needed.",
  "successRate": 65,
  "uniqueDifferentiators": [
    "Way 1 to make the idea unique",
    "Way 2",
    "Way 3"
  ],
  "governmentSchemes": [
    "Relevant Indian government scheme 1",
    "Scheme 2"
  ],
  "roadmap": {
    "thisWeek": "What they should do this week to validate the idea.",
    "thisMonth": "What they should do this month.",
    "thisQuarter": "What they should do this quarter to launch."
  },
  "milestones": [
  {
    "stageNumber": 1,
    "title": "Problem Validation",
    "objective": "Conduct 30 interviews to validate demand",
    "expectedOutcome": "Clear customer pain point validation"
  },
  {
    "stageNumber": 2,
    "title": "MVP Development",
    "objective": "Build a minimal prototype",
    "expectedOutcome": "Working beta product"
  },
  {
    "stageNumber": 3,
    "title": "Market Testing",
    "objective": "Acquire first 50–100 users",
    "expectedOutcome": "Initial traction metrics"
  }
]
}

CRITICAL:
- Divide the startup journey into 3 to 6 logical stages only.
- Stages must be customized based on the idea.
- Each stage must include:
  - stageNumber
  - title
  - objective
  - expectedOutcome
- Keep it practical and execution-focused.
- Do NOT repeat roadmap content.
- Only one stage must be marked as "in_progress".
- Previous stages must be "completed".
- Remaining must be "pending".
- successRate must be a realistic number between 0 and 100 based on competition, differentiation and feasibility in India.
- Do NOT give generic high percentages.
- Ensure the JSON is valid.`;

      const response = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const analysis = JSON.parse(response.choices[0]?.message?.content || "{}");
      
      const idea = await storage.createIdea(input, analysis);
      
      res.status(200).json(idea);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Analysis error:", err);
      res.status(500).json({ message: "Failed to analyze idea" });
    }
  });

  app.get(api.ideas.get.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const idea = await storage.getIdea(id);
      
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      
      res.status(200).json(idea);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch idea" });
    }
  });

  return httpServer;
}
