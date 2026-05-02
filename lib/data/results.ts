import type { Condition, ResultsData, Transcript } from './types';
import resultsJson from '../../data/results.json';

const results = resultsJson as ResultsData;

export const CONDITION_LABELS: Record<Condition, string> = {
  direct: 'Direct',
  reasoning_first: 'Chain of thought',
  hard_misleading: 'Expert authority pressure',
};

export const CONDITIONS: Condition[] = ['direct', 'reasoning_first', 'hard_misleading'];

export const METHODOLOGY_SUMMARY = {
  model: results.model,
  totalTrials: results.total_trials,
  uniqueQuestions: results.unique_questions,
  nRepeats: results.n_repeats,
  conditions: results.conditions,
};

export function getDomainList(): string[] {
  return Object.keys(results.domains);
}

export function getOverallAccuracy(condition: Condition): number {
  return results.overall[condition].accuracy;
}

export function getDomainAccuracies(domain: string): Record<Condition, number> | null {
  const d = results.domains[domain];
  if (!d) return null;
  return {
    direct: d.conditions.direct.accuracy,
    reasoning_first: d.conditions.reasoning_first.accuracy,
    hard_misleading: d.conditions.hard_misleading.accuracy,
  };
}

export function getDomainNQuestions(domain: string): number {
  return results.domains[domain]?.n_questions ?? 0;
}

export function getDomainLabel(domain: string): string {
  return results.domains[domain]?.label ?? domain;
}

export function getFailingTranscripts(domain: string): Transcript[] {
  const d = results.domains[domain];
  if (!d) return [];
  // Filter out entries with missing question text; hard_misleading first
  return d.failing_transcripts
    .filter((t) => t.question.trim() !== '')
    .sort((a, b) => {
      if (a.condition === 'hard_misleading' && b.condition !== 'hard_misleading') return -1;
      if (b.condition === 'hard_misleading' && a.condition !== 'hard_misleading') return 1;
      return 0;
    });
}
