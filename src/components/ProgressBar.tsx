import { SemiCircleProgress } from "./SemiCircleProgress";

export function ProgressBar({
  progress,
  text,
}: {
  progress: number;
  text: string;
}) {
  const validProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div>
      <div className="flex md:hidden w-full">
        <div className="flex flex-col w-full gap-1">
          <div className="bg-card-border rounded-full h-full">
            <div
              className={`bg-linear-to-r from-primary to-primary-accent h-5 rounded-full transition-all duration-500`}
              style={{
                width: `${validProgress}%`,
              }}
            />
          </div>
          <p className="text-foreground font-semibold text-lg">{text}</p>
        </div>
      </div>
      <div className="hidden md:flex">
        <SemiCircleProgress progress={validProgress} text={text} />
      </div>
    </div>
  );
}
