import { SemiCircleProgress } from "react-semicircle-progressbar";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div>
      <SemiCircleProgress
        percentage={80}
        size={{
          width: 200,
          height: 200,
        }}
        strokeWidth={10}
        strokeColor="#f00"
      />
    </div>
  );
}
