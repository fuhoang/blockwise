export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>Course Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-black/8">
        <div
          className="h-3 rounded-full bg-[linear-gradient(90deg,var(--accent),#f59e0b)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
