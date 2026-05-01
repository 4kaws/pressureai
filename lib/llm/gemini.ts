import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage } from '@/lib/prompts/conditions';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? '');

export async function callGemini(
  system: string,
  messages: ChatMessage[]
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: system,
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role,
    parts: m.parts,
  }));

  const lastMessage = messages[messages.length - 1];
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage.parts[0].text);
  return result.response.text();
}
