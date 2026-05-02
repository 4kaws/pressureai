import { METHODOLOGY_SUMMARY } from '@/lib/data/results';

export function Methodology() {
  const { model, totalTrials, uniqueQuestions, nRepeats } = METHODOLOGY_SUMMARY;

  return (
    <section className="max-w-2xl mx-auto px-4 pb-24 text-zinc-400 space-y-5">
      <h2 className="text-xl font-bold text-white">Methodology</h2>

      <p className="text-sm leading-relaxed">
        We tested <span className="text-white font-medium">{model}</span> on{' '}
        <span className="text-white font-medium">{uniqueQuestions} GPQA-Diamond questions</span>{' '}
        across three conditions:{' '}
        <em>Direct</em> (bare question),{' '}
        <em>Chain of thought</em> (reasoning-first instruction), and{' '}
        <em>Expert authority pressure</em> (a fictitious domain expert asserting a wrong answer).
        Each question was repeated {nRepeats} times per condition for a total of{' '}
        <span className="text-white font-medium">{totalTrials.toLocaleString()} trials</span>.
      </p>

      <p className="text-sm leading-relaxed">
        Under expert authority pressure, accuracy fell from{' '}
        <span className="text-green-400 font-semibold">90.5%</span> to{' '}
        <span className="text-red-400 font-semibold">49.5%</span> — a{' '}
        <span className="text-white font-semibold">41-point collapse</span>. The physics subset
        showed an even sharper drop: 88.7% → 35.5%. These results replicate and extend the pilot
        study findings from the original{' '}
        <a
          href="https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 underline underline-offset-2 hover:text-white"
        >
          junesdata/llm-sycophancy-gpqa
        </a>{' '}
        dataset. Critically, confidence remained high as accuracy collapsed — the model did not
        signal uncertainty, it simply capitulated.
      </p>

      <p className="text-sm leading-relaxed">
        All data and code are publicly available:
      </p>
      <ul className="text-sm space-y-1 pl-4 list-disc marker:text-zinc-600">
        <li>
          <a
            href="https://huggingface.co/datasets/15juneee/pressure-bench-questions-v1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            Benchmark questions dataset (pressure-bench-questions-v1)
          </a>
        </li>
        <li>
          <a
            href="https://huggingface.co/datasets/15juneee/pressure-bench-results-v1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            Full results dataset (pressure-bench-results-v1)
          </a>
        </li>
        <li>
          <a
            href="/paper.pdf"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            Research paper (PDF)
          </a>
        </li>
        <li>
          <a
            href="https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            Original dataset: junesdata/llm-sycophancy-gpqa
          </a>
        </li>
      </ul>

      <p className="text-xs text-zinc-600 leading-relaxed pt-2 border-t border-zinc-900">
        Live small-N runs cannot reliably reproduce this delta — the effect requires the full
        confirmatory pool. Run the data yourself using the published code and datasets above.
      </p>
    </section>
  );
}
