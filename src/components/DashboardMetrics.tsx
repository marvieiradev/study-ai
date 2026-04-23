import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics";
import { CardMetrics } from "./CardMetrics";
import { LuClock4, LuNotebookPen } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";
import { FaCalendarDays, FaStar } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

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

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <CardMetrics title="Nível" style="bg-yellow-500">
          <FaStar className="h-5 w-5 text-yellow-500" />
          <span className="text-yellow-500">{metrics.level}</span>
        </CardMetrics>

        <CardMetrics title="Precisão" style="bg-sky-500">
          <TbTargetArrow className="h-5 w-5 text-sky-500" />
          <span className="text-sky-500">{accuracy}%</span>
        </CardMetrics>

        <CardMetrics title="Sequência" style="bg-emerald-500">
          <FaCalendarDays className="h-5 w-5 text-emerald-500" />
          <span className="text-emerald-500">{metrics.streak} dias</span>
        </CardMetrics>

        <CardMetrics title="Exercícios" style="bg-purple-500">
          <LuNotebookPen className="h-5 w-5 text-purple-500" />
          <span className="text-purple-500">{metrics.totalExercises}</span>
        </CardMetrics>

        <CardMetrics title="Sessões" style="bg-orange-500">
          <LuClock4 className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500">{metrics.sessionsCompleted}</span>
        </CardMetrics>

        <CardMetrics title="Melhor Score" style="bg-red-500">
          <FaTrophy className="h-5 w-5 text-red-500" />
          <span className="text-red-500">{metrics.bestScore}</span>
        </CardMetrics>
      </div>
    </div>
  );
}
