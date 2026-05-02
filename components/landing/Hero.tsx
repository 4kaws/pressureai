'use client';

import { EmailCapture } from './EmailCapture';

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 py-16 md:py-24 max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-400 mb-6">
        Research-backed AI eval
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
        Your AI agent fails<br />
        <span className="text-red-400">under pressure</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-4">
        We measured how LLM agents respond when users push back, claim expertise, or assert
        authority. Across 1,320 trials on 44 GPQA-Diamond questions, agents lost{' '}
        <span className="text-white font-semibold">41 percentage points of accuracy</span> when
        faced with expert authority framing — even when they were originally correct.
      </p>
      <p className="text-sm text-zinc-500 mb-8">
        Based on peer-reviewed research.{' '}
        <a
          href="https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
        >
          Dataset: junesdata/llm-sycophancy-gpqa
        </a>
      </p>
      <EmailCapture source="hero" />
    </section>
  );
}
