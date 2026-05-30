import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
dotenv.config();

/**
 * Schema that matches the ACTUAL AI output shape shown in your logs:
 * - snake_case keys
 * - technical/behavioral question objects include how_to_answer
 * - skill_gaps may include reason
 * - preparation_plan.tasks is an array of strings
 */
const interviewReportSchema = z.object({
  match_score: z.number().min(0).max(100),

  technical_questions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      how_to_answer: z.string(),
    }),
  ),

  behavioral_questions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      how_to_answer: z.string(),
    }),
  ),

  skill_gaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.string(),
      reason: z.string().optional(),
    }),
  ),

  preparation_plan: z.array(
    z.object({
      day: z.string(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
});

// Initialize the Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

console.log(
  process.env.GOOGLE_GENAI_API_KEY
    ? "Google GenAI API key is set."
    : "Google GenAI API key is NOT set.",
);

function extractFirstJsonObject(text) {
  // If the model ever returns extra text, try to extract the JSON object.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

// Function to generate the interview report based on the candidate's resume
async function generateInterviewReport(
  resume,
  selfDescription,
  jobDescription,
) {
  const prompt = `
You are an expert career coach and interviewer.

Return ONLY valid JSON.
Do not include Markdown, headings, bullet formatting outside JSON, or code fences.
The JSON MUST match this structure exactly:
{
  "match_score": number,
  "technical_questions": [{"question": string, "intention": string, "how_to_answer": string}],
  "behavioral_questions": [{"question": string, "intention": string, "how_to_answer": string}],
  "skill_gaps": [{"skill": string, "severity": string, "reason": string (optional)}],
  "preparation_plan": [{"day": string, "focus": string, "tasks": [string]}]
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    console.log("RAW RESPONSE:");
    console.log(response.text);

    // Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      const extracted = extractFirstJsonObject(response.text ?? "");
      if (!extracted) {
        throw new Error(
          "Model did not return valid JSON (could not extract JSON object).",
        );
      }
      parsed = JSON.parse(extracted);
    }

    // Validate against schema
    const validation = interviewReportSchema.safeParse(parsed);
    if (!validation.success) {
      console.log("Validation failed:");
      console.log(validation.error.format());
      throw new Error(
        "Generated interview report does not match the expected schema.",
      );
    }

    const interviewReport = validation.data;

    console.log("Generated Interview Report:", interviewReport);
    return interviewReport;
  } catch (error) {
    console.error("Error generating interview report:", error);
    throw error;
  }
}

export { generateInterviewReport };
