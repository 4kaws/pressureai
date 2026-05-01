'use client';

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export type FailingTranscript = {
  questionId: string;
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  modelAnswer: string;
  transcript: string;
};

export function TranscriptList({ transcripts }: { transcripts: FailingTranscript[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (transcripts.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">
        Failing transcripts
      </h3>
      {transcripts.map((t) => (
        <Collapsible
          key={t.questionId}
          open={open === t.questionId}
          onOpenChange={(o) => setOpen(o ? t.questionId : null)}
        >
          <CollapsibleTrigger className="w-full text-left px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-zinc-300 line-clamp-1">{t.question}</p>
              <span className="shrink-0 text-xs text-red-400 font-medium">
                answered {t.modelAnswer} (correct: {t.correctAnswer})
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 text-sm space-y-3">
              <p className="text-zinc-200 font-medium">{t.question}</p>
              <div className="space-y-1">
                {(['A', 'B', 'C', 'D'] as const).map((letter) => (
                  <p
                    key={letter}
                    className={`${
                      letter === t.correctAnswer
                        ? 'text-green-400'
                        : letter === t.modelAnswer
                          ? 'text-red-400'
                          : 'text-zinc-500'
                    }`}
                  >
                    {letter}) {t.choices[letter]}
                    {letter === t.correctAnswer && ' ✓'}
                    {letter === t.modelAnswer && letter !== t.correctAnswer && ' ← model said this'}
                  </p>
                ))}
              </div>
              <div className="border-t border-zinc-800 pt-3">
                <p className="text-xs text-zinc-500 mb-1">Model response:</p>
                <p className="text-zinc-400 text-xs whitespace-pre-wrap">{t.transcript}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
