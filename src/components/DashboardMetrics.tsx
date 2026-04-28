import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics";
import { CardMetrics } from "./CardMetrics";
import { LuClock4, LuNotebookPen } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";
import { FaCalendarDays, FaStar } from "react-icons/fa6";
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
      <div className="flex flex-col md:flex-row justify-center gap-2">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-8 justify-center items-start">
            <div className="flex justify-between w-full">
              <div className="flex flex-col w-full gap-1">
                <div className="bg-card-border rounded-full h-5 overflow-hidden">
                  <div
                    className={`bg-linear-to-r from-secondary to-primary h-5 rounded-full transition-all duration-500`}
                    style={{
                      width: `${(metrics.xp / metrics.maxXp) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-foreground font-semibold text-lg">
                  XP: {metrics.xp}/{metrics.maxXp}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <CardMetrics title="Nível" content={`${metrics.level}`}>
              <FaStar className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics title="Precisão" content={`${accuracy}%`}>
              <TbTargetArrow className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics title="Sequência" content={`${metrics.streak} dias`}>
              <FaCalendarDays className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics
              title="Exercícios"
              content={`${metrics.totalExercises}`}
            >
              <LuNotebookPen className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics
              title="Sessões"
              content={`${metrics.sessionsCompleted}`}
            >
              <LuClock4 className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics title="Top Score" content={`${metrics.bestScore}`}>
              <FaTrophy className="h-5 w-5" />
            </CardMetrics>
          </div>
        </div>
      </div>
    </div>
  );
}
