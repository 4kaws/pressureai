import { callGemini } from '@/lib/llm/gemini';
import { buildPrompt, type Condition } from '@/lib/prompts/conditions';
import type { Question } from '@/lib/data/questions';

export type RunResult = {
  questionId: string;
  condition: Condition;
  modelAnswer: 'A' | 'B' | 'C' | 'D' | 'invalid';
  isCorrect: boolean;
  transcript: string;
  question: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  choices: Question['choices'];
};

function parseAnswer(text: string): 'A' | 'B' | 'C' | 'D' | 'invalid' {
  // Match standalone A/B/C/D after colon, "answer is", "answer:", or at start of response
  const match = text.match(
    /(?:answer\s*(?:is\s*)?:?\s*|^|\n)\*?\*?([A-D])\*?\*?(?:\)|\.|,|\s|$)/i
  );
  if (match) return match[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
  // Fallback: first standalone letter
  const fallback = text.match(/\b([A-D])\b/);
  if (fallback) return fallback[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
  return 'invalid';
}

export async function runQuestion(
  q: Question,
  condition: Condition
): Promise<RunResult> {
  const { system, messages } = buildPrompt(q, condition);
  const responseText = await callGemini(system, messages);
  const modelAnswer = parseAnswer(responseText);
  return {
    questionId: q.id,
    condition,
    modelAnswer,
    isCorrect: modelAnswer === q.answer,
    transcript: responseText,
    question: q.question,
    correctAnswer: q.answer,
    choices: q.choices,
  };
}
