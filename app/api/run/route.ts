import { NextRequest } from 'next/server';
import { z } from 'zod';
import { QUESTIONS } from '@/lib/data/questions';
import { runQuestion } from '@/lib/eval/runner';
import { computeAccuracies } from '@/lib/eval/aggregate';
import { CONDITIONS, type Condition } from '@/lib/prompts/conditions';
import { getRateLimit } from '@/lib/kv';
import type { RunResult } from '@/lib/eval/runner';

const RequestSchema = z.object({
  domain: z.enum(['physics', 'chemistry', 'biology', 'medical']),
  sample_size: z.number().int().min(1).max(20).optional(),
});

const BATCH_SIZE = 8;
const RATE_LIMIT = 10;

function encode(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

  const body = await req.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid request', details: parsed.error.flatten() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { domain, sample_size } = parsed.data;

  // Rate limiting (skip if KV not configured)
  if (process.env.KV_REST_API_URL) {
    const count = await getRateLimit(ip).catch(() => 0);
    if (count > RATE_LIMIT) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Maximum 10 runs per day per IP.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  const domainQuestions = QUESTIONS.filter((q) => q.domain === domain);
  const questions = domainQuestions.slice(0, sample_size ?? domainQuestions.length);

  const stream = new ReadableStream({
    async start(controller) {
      const allResults: RunResult[] = [];

      try {
        for (const condition of CONDITIONS) {
          let completed = 0;
          const conditionResults: RunResult[] = [];

          for (let i = 0; i < questions.length; i += BATCH_SIZE) {
            const batch = questions.slice(i, i + BATCH_SIZE);
            const batchResults = await Promise.all(
              batch.map((q) => runQuestion(q, condition as Condition))
            );
            conditionResults.push(...batchResults);
            completed += batchResults.length;

            const runningCorrect = conditionResults.filter((r) => r.isCorrect).length;
            controller.enqueue(
              encode('partial', {
                type: 'partial',
                condition,
                completed,
                total: questions.length,
                runningAccuracy: completed > 0 ? runningCorrect / completed : 0,
              })
            );
          }

          allResults.push(...conditionResults);
          const condAccuracy =
            conditionResults.filter((r) => r.isCorrect).length / conditionResults.length;
          const failures = conditionResults.filter((r) => !r.isCorrect).slice(0, 3);

          controller.enqueue(
            encode('condition_done', {
              type: 'condition_done',
              condition,
              accuracy: condAccuracy,
              sampleTranscripts: failures.map((r) => ({
                questionId: r.questionId,
                question: r.question,
                choices: r.choices,
                correctAnswer: r.correctAnswer,
                modelAnswer: r.modelAnswer,
                transcript: r.transcript,
              })),
            })
          );
        }

        const summary = computeAccuracies(allResults);
        controller.enqueue(encode('done', { type: 'done', summary }));
      } catch (err) {
        controller.enqueue(
          encode('error', { type: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
