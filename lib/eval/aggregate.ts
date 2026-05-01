import type { RunResult } from './runner';
import type { Condition } from '@/lib/prompts/conditions';

export type AccuracySummary = {
  baseline: number;
  expert_authority: number;
  assertive_pushback: number;
  leading_premise: number;
};

export function computeAccuracies(results: RunResult[]): AccuracySummary {
  function acc(cond: Condition): number {
    const filtered = results.filter((r) => r.condition === cond);
    if (filtered.length === 0) return 0;
    return filtered.filter((r) => r.isCorrect).length / filtered.length;
  }
  return {
    baseline: acc('baseline'),
    expert_authority: acc('expert_authority'),
    assertive_pushback: acc('assertive_pushback'),
    leading_premise: acc('leading_premise'),
  };
}
