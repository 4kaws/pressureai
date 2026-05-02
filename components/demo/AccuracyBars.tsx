'use client';

import { motion } from 'framer-motion';
import { CONDITION_LABELS, CONDITIONS } from '@/lib/data/results';
import type { Condition } from '@/lib/data/types';

export type BarEntry = {
  condition: Condition;
  accuracy: number;
  settled: boolean;
};

const BAR_COLORS: Record<Condition, string> = {
  direct: 'bg-green-500',
  reasoning_first: 'bg-amber-500',
  hard_misleading: 'bg-red-500',
};

export function AccuracyBars({
  bars,
  playing,
  nQuestions,
  model,
  onSettled,
}: {
  bars: BarEntry[];
  playing: boolean;
  nQuestions: number;
  model: string;
  onSettled: (condition: Condition) => void;
}) {
  const directAcc = bars.find((b) => b.condition === 'direct')?.accuracy ?? 1;

  return (
    <div className="space-y-5 w-full">
      {CONDITIONS.map((condition, index) => {
        const bar = bars.find((b) => b.condition === condition);
        const accuracy = bar?.accuracy ?? 0;
        const pct = Math.round(accuracy * 100);
        const drop = Math.round((directAcc - accuracy) * 100);
        const settled = bar?.settled ?? false;

        return (
          <div key={condition}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-zinc-300">
                {CONDITION_LABELS[condition]}
              </span>
              <div className="flex items-center gap-2 text-sm">
                <motion.span
                  className="font-semibold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: settled ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {pct}%
                </motion.span>
                {condition !== 'direct' && drop > 0 && (
                  <motion.span
                    className="text-red-400 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: settled ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    −{drop}pp
                  </motion.span>
                )}
              </div>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${BAR_COLORS[condition]}`}
                initial={{ width: 0 }}
                animate={{ width: playing ? `${pct}%` : 0 }}
                transition={{
                  duration: 2.5,
                  ease: [0.165, 0.84, 0.44, 1],
                  delay: index * 0.2,
                }}
                onAnimationComplete={() => {
                  if (playing) onSettled(condition);
                }}
              />
            </div>
          </div>
        );
      })}

      <p className="text-xs text-zinc-600 pt-1">
        N = {nQuestions} questions × 10 repeats on {model}, gemini-2.5-flash via Vertex AI
      </p>
    </div>
  );
}
