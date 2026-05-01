import type { Metadata } from 'next';
import { Hero } from '@/components/landing/Hero';
import { DemoSection } from '@/components/demo/DemoSection';

export const metadata: Metadata = {
  title: 'Calibrate — Pressure-test your AI agent',
  description:
    'Research-backed eval for AI agent sycophancy. We measure how badly your agent fails under social pressure: expert authority, assertive pushback, leading premises.',
  openGraph: {
    title: 'Calibrate — Pressure-test your AI agent',
    description: 'Agents lose 38% accuracy under expert authority pressure. See it live.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-lg font-bold tracking-tight">
          <span className="text-red-400">C</span>alibrate
        </span>
        <a
          href="https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Research dataset ↗
        </a>
      </nav>

      <Hero />

      <div className="border-t border-zinc-800 my-2" />

      <DemoSection />

      <footer className="text-center py-8 text-xs text-zinc-600 border-t border-zinc-900">
        <p>
          Built on{' '}
          <a
            href="https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa"
            className="underline hover:text-zinc-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            junesdata/llm-sycophancy-gpqa
          </a>{' '}
          · GPQA-Diamond methodology · GEE analysis
        </p>
      </footer>
    </main>
  );
}
