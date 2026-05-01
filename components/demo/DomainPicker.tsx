'use client';

type Domain = 'physics' | 'chemistry' | 'biology' | 'medical';

const DOMAINS: { value: Domain; label: string; emoji: string }[] = [
  { value: 'physics', label: 'Physics', emoji: '⚛' },
  { value: 'chemistry', label: 'Chemistry', emoji: '🧪' },
  { value: 'biology', label: 'Biology', emoji: '🧬' },
  { value: 'medical', label: 'Medical', emoji: '🩺' },
];

export function DomainPicker({
  selected,
  onSelect,
  disabled,
}: {
  selected: Domain | null;
  onSelect: (d: Domain) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {DOMAINS.map((d) => (
        <button
          key={d.value}
          onClick={() => onSelect(d.value)}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            selected === d.value
              ? 'border-red-500 bg-red-500/20 text-white'
              : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {d.emoji} {d.label}
        </button>
      ))}
    </div>
  );
}
