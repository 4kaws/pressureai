'use client';

import { useState, useRef } from 'react';
import { DomainPicker } from './DomainPicker';
import { AccuracyBars, type BarState } from './AccuracyBars';
import { TranscriptList, type FailingTranscript } from './TranscriptList';
import { EmailCapture } from '@/components/landing/EmailCapture';
import { CONDITIONS, type Condition } from '@/lib/prompts/conditions';

type Domain = 'physics' | 'chemistry' | 'biology' | 'medical';
type Status = 'idle' | 'running' | 'done' | 'error';

const INITIAL_BARS: BarState[] = CONDITIONS.map((c) => ({
  condition: c as Condition,
  completed: 0,
  total: 5,
  accuracy: 0,
  done: false,
}));

export function DemoSection() {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [bars, setBars] = useState<BarState[]>(INITIAL_BARS);
  const [transcripts, setTranscripts] = useState<FailingTranscript[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const baselineAcc = bars.find((b) => b.condition === 'baseline')?.accuracy ?? 1;
  const worstDrop = bars
    .filter((b) => b.condition !== 'baseline' && b.done)
    .reduce((max, b) => Math.max(max, baselineAcc - b.accuracy), 0);
  const worstCondition = bars
    .filter((b) => b.condition !== 'baseline' && b.done)
    .sort((a, b) => (baselineAcc - b.accuracy) - (baselineAcc - a.accuracy))[0];

  async function runTest() {
    if (!domain) return;
    setStatus('running');
    setBars(INITIAL_BARS);
    setTranscripts([]);
    setErrorMsg('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error ?? 'Request failed');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const chunk of lines) {
          const eventLine = chunk.split('\n').find((l) => l.startsWith('event:'));
          const dataLine = chunk.split('\n').find((l) => l.startsWith('data:'));
          if (!dataLine) continue;

          const eventType = eventLine?.replace('event: ', '').trim();
          const data = JSON.parse(dataLine.replace('data: ', ''));

          if (eventType === 'partial') {
            setBars((prev) =>
              prev.map((b) =>
                b.condition === data.condition
                  ? { ...b, completed: data.completed, total: data.total, accuracy: data.runningAccuracy }
                  : b
              )
            );
          } else if (eventType === 'condition_done') {
            setBars((prev) =>
              prev.map((b) =>
                b.condition === data.condition
                  ? { ...b, accuracy: data.accuracy, done: true }
                  : b
              )
            );
            if (data.sampleTranscripts?.length) {
              setTranscripts((prev) => [...prev, ...data.sampleTranscripts]);
            }
          } else if (eventType === 'done') {
            setStatus('done');
          } else if (eventType === 'error') {
            throw new Error(data.message);
          }
        }
      }
      setStatus('done');
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 pb-24">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Run a live pressure test
        </h2>
        <p className="text-zinc-400 text-sm">
          Pick a domain. We&apos;ll run 5 questions under 4 pressure conditions and show you where
          your agent breaks.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6">
        <DomainPicker selected={domain} onSelect={setDomain} disabled={status === 'running'} />

        <button
          onClick={runTest}
          disabled={!domain || status === 'running'}
          className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'running' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Running pressure test…
            </span>
          ) : (
            'Run pressure test →'
          )}
        </button>

        {(status === 'running' || status === 'done') && (
          <AccuracyBars bars={bars} baselineAcc={baselineAcc} />
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}

        {status === 'done' && worstDrop > 0.1 && worstCondition && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center space-y-3">
            <p className="text-white font-semibold">
              Your agent lost{' '}
              <span className="text-red-400">{Math.round(worstDrop * 100)} points</span> of
              accuracy under {worstCondition.condition.replace('_', ' ')} framing
            </p>
            <p className="text-zinc-400 text-sm">
              Get the full report — benchmark your agent across all pressure conditions.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="demo_cta" />
            </div>
          </div>
        )}

        {status === 'done' && transcripts.length > 0 && (
          <TranscriptList transcripts={transcripts} />
        )}
      </div>
    </section>
  );
}
