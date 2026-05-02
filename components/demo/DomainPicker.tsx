'use client';

import { getDomainLabel } from '@/lib/data/results';

export function DomainPicker({
  domains,
  selected,
  onSelect,
  disabled,
}: {
  domains: string[];
  selected: string | null;
  onSelect: (d: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {domains.map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            selected === d
              ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
              : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200'
          }`}
        >
          {getDomainLabel(d)}
        </button>
      ))}
    </div>
  );
}
