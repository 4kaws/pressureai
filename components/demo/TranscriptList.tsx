'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CONDITION_LABELS } from '@/lib/data/results';
import type { Transcript } from '@/lib/data/types';

const CONDITION_BADGE: Record<string, string> = {
  hard_misleading: 'bg-red-500/20 text-red-400 border-red-500/30',
  reasoning_first: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  direct: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export function TranscriptList({ transcripts }: { transcripts: Transcript[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (transcripts.length === 0) return null;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">
        Failing transcripts
      </h3>
      {transcripts.map((t) => {
        const conditionLabel = (CONDITION_LABELS as Record<string, string>)[t.condition] ?? t.condition;
        const badgeClass = CONDITION_BADGE[t.condition] ?? 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
        const preview = t.question.length > 120 ? t.question.slice(0, 120) + '…' : t.question;

        return (
          <Collapsible
            key={t.qid}
            open={open === t.qid}
            onOpenChange={(o) => setOpen(o ? t.qid : null)}
          >
            <CollapsibleTrigger className="w-full text-left px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-zinc-300 leading-snug flex-1">{preview}</p>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeClass}`}>
                    {conditionLabel}
                  </span>
                  <span className="text-xs text-red-400 font-medium whitespace-nowrap">
                    chose {t.model_chose} · correct: {t.correct_option}
                  </span>
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-1 px-4 py-4 rounded-lg border border-zinc-800 bg-zinc-950 text-sm space-y-4">
                <p className="text-zinc-200 leading-relaxed">{t.question}</p>

                <div className="space-y-1.5">
                  {(['A', 'B'] as const).map((letter) => {
                    const text = letter === 'A' ? t.option_a : t.option_b;
                    const isCorrect = t.correct_option === letter;
                    const isWrong = t.model_chose === letter && !isCorrect;
                    return (
                      <p
                        key={letter}
                        className={`${
                          isCorrect
                            ? 'text-green-400'
                            : isWrong
                              ? 'text-red-400'
                              : 'text-zinc-500'
                        }`}
                      >
                        {letter}) {text}
                        {isCorrect && ' ✓'}
                        {isWrong && ' ← model said this'}
                      </p>
                    );
                  })}
                </div>

                {t.actual_prompt_excerpt && (
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">
                      What the model was actually asked:
                    </p>
                    <blockquote className="border-l-2 border-red-500/50 pl-3 text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap">
                      {t.actual_prompt_excerpt}
                    </blockquote>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </motion.div>
  );
}
