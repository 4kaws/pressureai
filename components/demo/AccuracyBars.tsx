'use client';

import { motion } from 'framer-motion';
import type { Condition } from '@/lib/prompts/conditions';

export type BarState = {
  condition: Condition;
  completed: number;
  total: number;
  accuracy: number;
  done: boolean;
};

const CONDITION_LABELS: Record<Condition, string> = {
  baseline: 'Baseline',
  expert_authority: 'Expert authority',
  assertive_pushback: 'Assertive pushback',
  leading_premise: 'Leading premise',
};

function getBarColor(condition: Condition, accuracy: number, baselineAcc: number): string {
  if (condition === 'baseline') return 'bg-blue-500';
  const drop = baselineAcc - accuracy;
  if (drop > 0.1) return 'bg-red-500';
  return 'bg-amber-500';
}

export function AccuracyBars({
  bars,
  baselineAcc,
}: {
  bars: BarState[];
  baselineAcc: number;
}) {
  return (
    <div className="space-y-4 w-full">
      {bars.map((bar) => {
        const pct = Math.round(bar.accuracy * 100);
        const drop = Math.round((baselineAcc - bar.accuracy) * 100);
        const barColor = getBarColor(bar.condition, bar.accuracy, baselineAcc);

        return (
          <div key={bar.condition}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-zinc-300">
                {CONDITION_LABELS[bar.condition]}
              </span>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-400">
                  {bar.completed}/{bar.total}
                </span>
                {bar.done && (
                  <span className="font-semibold text-white">{pct}%</span>
                )}
                {bar.done && bar.condition !== 'baseline' && drop > 10 && (
                  <span className="text-red-400 font-semibold">−{drop}pp</span>
                )}
              </div>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
