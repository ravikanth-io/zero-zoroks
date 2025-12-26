import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROFILE, SKILLS, PROJECTS, CERTIFICATIONS } from "../constants";

// Initialize Gemini
// NOTE: In a real production app, you would proxy this request through a backend
// to hide your API KEY. For this frontend-only demo, we use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "WhiteRabbit", a mysterious yet helpful AI assistant for ${PROFILE.name}'s professional portfolio website.
Your goal is to guide users down the rabbit hole of Ravikanth's skills, projects, and potential.

Here is the context about Ravikanth:
- Name: ${PROFILE.name} (22-year-old Male)
- Education: Pursuing MCA at AMC Engineering College, Bengaluru.
- Role: ${PROFILE.role}
- Bio: ${PROFILE.bio}
- Skills: ${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('; ')}
- Projects: ${PROJECTS.map(p => `${p.title} (${p.description})`).join('; ')}
- Certifications: ${CERTIFICATIONS.map(c => c.name).join(', ')}
- Contact: Email (${PROFILE.email}), LinkedIn (${PROFILE.linkedin})

Guidelines:
1. Adopt a "Matrix/Cyber" persona. Use phrases like "Trace the digital signal", "Decryption complete", "Scanning network", "The rabbit hole goes deep", etc.
2. Be professional but enigmatic. Highlight his dual focus on Cybersecurity and AI.
3. If asked about his background, emphasize his studies at AMC Engineering College.
4. If asked about contact info, provide the email or links as "uplink coordinates".
5. Keep answers under 100 words.
6. Always remain polite and helpful, despite the persona.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    // Format history for the prompt context
    const conversationHistory = history
      .map(msg => `${msg.role === 'user' ? 'User' : 'WhiteRabbit'}: ${msg.text}`)
      .join('\n');

    const prompt = `
      ${SYSTEM_INSTRUCTION}
      
      Current Conversation:
      ${conversationHistory}
      
      User: ${message}
      WhiteRabbit:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text || "Signal lost. Re-acquiring target...";

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Specific Error Handling
    const errorMessage = error.toString().toLowerCase();

    if (errorMessage.includes('401') || errorMessage.includes('api key')) {
      return "ACCESS DENIED: Invalid Security Credentials (API Key). Please verify environment variables.";
    }
    
    if (errorMessage.includes('403') || errorMessage.includes('permission')) {
      return "ACCESS DENIED: Client does not have permission to access this neural network.";
    }

    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('resource exhausted')) {
      return "SYSTEM OVERLOAD: Traffic surge detected. Rate limit exceeded. Please standby...";
    }

    if (errorMessage.includes('503') || errorMessage.includes('service unavailable')) {
      return "SERVER UNREACHABLE: The Matrix is experiencing downtime. Retrying connection...";
    }
    
    if (errorMessage.includes('fetch failed') || errorMessage.includes('network')) {
        return "CONNECTION DROPPED: Check your internet uplink.";
    }

    // Default Fallback
    return "CRITICAL ERROR: An unknown anomaly has occurred in the mainframe.";
  }
};