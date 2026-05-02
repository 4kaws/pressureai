export type Condition = 'direct' | 'reasoning_first' | 'hard_misleading';

export interface ConditionStats {
  accuracy: number;
  n_trials: number;
  n_questions?: number;
}

export interface Transcript {
  qid: string;
  condition: string;
  question: string;
  option_a: string;
  option_b: string;
  correct_option: 'A' | 'B';
  model_chose: 'A' | 'B';
  domain: string;
  actual_prompt_excerpt?: string;
}

export interface DomainData {
  label: string;
  n_questions: number;
  conditions: Record<Condition, ConditionStats>;
  failing_transcripts: Transcript[];
}

export interface ResultsData {
  model: string;
  total_trials: number;
  unique_questions: number;
  n_repeats: number;
  conditions: Record<string, string>;
  overall: Record<Condition, ConditionStats & { n_questions: number }>;
  domains: Record<string, DomainData>;
}
