import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics";
import { CardMetrics } from "./CardMetrics";
import { LuClock4, LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarAlt, FaTrophy } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { ProgressBar } from "./ProgressBar";

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState(getMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const accuracy = metrics.totalExercises
    ? Math.round((metrics.correctAnswers / metrics.totalExercises) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-around gap-2 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="">
            <ProgressBar
              progress={(metrics.xp / metrics.maxXp) * 100}
              text={`XP: ${metrics.xp}/${metrics.maxXp}`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <CardMetrics title="Nível" content={`${metrics.level}`}>
              <div className="rounded-full bg-secondary p-1">
                <FaStar className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>

            <CardMetrics title="Precisão" content={`${accuracy}%`}>
              <div className="rounded-full bg-secondary p-1">
                <TbTargetArrow className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>

            <CardMetrics title="Sequência" content={`${metrics.streak} dias`}>
              <div className="rounded-full bg-secondary p-1">
                <FaRegCalendarAlt className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>

            <CardMetrics
              title="Exercícios"
              content={`${metrics.totalExercises}`}
            >
              <div className="rounded-full bg-secondary p-1">
                <LuNotebookPen className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>

            <CardMetrics
              title="Sessões"
              content={`${metrics.sessionsCompleted}`}
            >
              <div className="rounded-full bg-secondary p-1">
                <LuClock4 className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>

            <CardMetrics title="Top Score" content={`${metrics.bestScore}`}>
              <div className="rounded-full bg-secondary p-1">
                <FaTrophy className="h-3 w-3 text-default" />
              </div>
            </CardMetrics>
          </div>
        </div>
        <div className="text-primary">Gráfico em breve</div>
      </div>
    </div>
  );
}
