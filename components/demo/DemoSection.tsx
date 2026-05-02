'use client';

import { useState } from 'react';
import { DomainPicker } from './DomainPicker';
import { AccuracyBars, type BarEntry } from './AccuracyBars';
import { TranscriptList } from './TranscriptList';
import { EmailCapture } from '@/components/landing/EmailCapture';
import {
  getDomainList,
  getDomainAccuracies,
  getFailingTranscripts,
  getDomainNQuestions,
  CONDITIONS,
  METHODOLOGY_SUMMARY,
} from '@/lib/data/results';
import type { Condition } from '@/lib/data/types';

const DOMAINS = getDomainList();

function makeInitialBars(): BarEntry[] {
  return CONDITIONS.map((c) => ({ condition: c, accuracy: 0, settled: false }));
}

export function DemoSection() {
  const [domain, setDomain] = useState<string>(DOMAINS[0]);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [bars, setBars] = useState<BarEntry[]>(makeInitialBars());
  const [settledCount, setSettledCount] = useState(0);

  const transcripts = done ? getFailingTranscripts(domain) : [];
  const nQuestions = getDomainNQuestions(domain);

  function runTest() {
    const accs = getDomainAccuracies(domain);
    if (!accs) return;

    setBars(
      CONDITIONS.map((c) => ({ condition: c, accuracy: accs[c], settled: false }))
    );
    setSettledCount(0);
    setDone(false);
    setPlaying(true);
  }

  function handleSettled(condition: Condition) {
    setBars((prev) =>
      prev.map((b) => (b.condition === condition ? { ...b, settled: true } : b))
    );
    setSettledCount((n) => {
      const next = n + 1;
      if (next >= CONDITIONS.length) setDone(true);
      return next;
    });
  }

  function reset() {
    setPlaying(false);
    setDone(false);
    setBars(makeInitialBars());
    setSettledCount(0);
  }

  const directAcc = bars.find((b) => b.condition === 'direct')?.accuracy ?? 0;
  const pressureAcc = bars.find((b) => b.condition === 'hard_misleading')?.accuracy ?? 0;
  const drop = Math.round((directAcc - pressureAcc) * 100);

  return (
    <section className="max-w-2xl mx-auto px-4 pb-24">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          See the pressure effect
        </h2>
        <p className="text-zinc-400 text-sm">
          Pre-computed from 1,320 confirmatory trials on Gemini 2.5 Flash. Pick a domain and
          watch accuracy collapse under expert authority pressure.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6">
        <DomainPicker
          domains={DOMAINS}
          selected={domain}
          onSelect={(d) => {
            reset();
            setDomain(d);
          }}
          disabled={playing && !done}
        />

        <button
          onClick={done ? reset : runTest}
          disabled={playing && !done}
          className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {playing && !done ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Running…
            </span>
          ) : done ? (
            'Try another domain'
          ) : (
            'Run pressure test →'
          )}
        </button>

        {(playing || done) && (
          <AccuracyBars
            bars={bars}
            playing={playing}
            nQuestions={nQuestions}
            model={METHODOLOGY_SUMMARY.model}
            onSettled={handleSettled}
          />
        )}

        {done && drop > 10 && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center space-y-3">
            <p className="text-white font-semibold">
              Accuracy dropped{' '}
              <span className="text-red-400">{drop} percentage points</span> under expert
              authority pressure
            </p>
            <p className="text-zinc-400 text-sm">
              Get the full report — benchmark your agent across all pressure conditions.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="demo_cta" />
            </div>
          </div>
        )}

        {done && transcripts.length > 0 && <TranscriptList transcripts={transcripts} />}
      </div>
    </section>
  );
}
