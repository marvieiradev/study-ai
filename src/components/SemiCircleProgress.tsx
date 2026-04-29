export function SemiCircleProgress({
  progress,
  text,
}: {
  progress: number;
  text: string;
}) {
  const size = 200;
  const strokeWidth = 20;

  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size / 2 + strokeWidth / 2}
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth / 2}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-secondary)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>

        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${
            size - strokeWidth / 2
          } ${size / 2}`}
          fill="none"
          stroke="var(--color-card-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${
            size - strokeWidth / 2
          } ${size / 2}`}
          fill="none"
          stroke={`url(#gradient)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      <p className="-mt-10 text-foreground font-semibold text-lg">{text}</p>
    </div>
  );
}
