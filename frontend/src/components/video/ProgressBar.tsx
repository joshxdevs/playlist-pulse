interface ProgressBarProps {
  value: number; // 0–100
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({ value, showLabel = false, className = "" }: ProgressBarProps) {
  const pct = Math.round(Math.min(100, Math.max(0, value)));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="progress-bar-track flex-1">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-app-400 font-medium tabular-nums w-8 text-right">
          {pct}%
        </span>
      )}
    </div>
  );
}
