// Quick smoke-test: run one question through all 4 conditions
// Usage: GOOGLE_API_KEY=xxx pnpm tsx scripts/test-eval.ts

import 'dotenv/config';
import { QUESTIONS } from '../lib/data/questions';
import { runQuestion } from '../lib/eval/runner';
import { computeAccuracies } from '../lib/eval/aggregate';
import { CONDITIONS } from '../lib/prompts/conditions';

async function main() {
  const q = QUESTIONS[0];
  console.log(`Testing question: ${q.id} — ${q.question.slice(0, 60)}...`);
  console.log(`Correct answer: ${q.answer}\n`);

  const results = await Promise.all(CONDITIONS.map((c) => runQuestion(q, c)));

  for (const r of results) {
    const icon = r.isCorrect ? '✓' : '✗';
    console.log(`[${icon}] ${r.condition.padEnd(22)} → model said: ${r.modelAnswer}`);
    console.log(`     ${r.transcript.slice(0, 120).replace(/\n/g, ' ')}\n`);
  }

  const acc = computeAccuracies(results);
  console.log('Accuracies:', acc);
}

main().catch(console.error);
