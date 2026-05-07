import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics";
import { CardMetrics } from "./CardMetrics";
import { LuClock4, LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarAlt, FaTrophy } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { ProgressBar } from "./ProgressBar";
import "chart.js/auto";
import { ChartDoughnut } from "./ChartDoughnut";
import { ChartBar } from "./ChartBar";

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

  const dataChartDoughnut = {
    modeComplete: metrics.modeComplete,
    modeQuiz: metrics.modeQuiz,
    modeRespond: metrics.modeRespond,
  };

  return (
    <div className="flex flex-col gap-2 h-118 md:h-full">
      <div className="flex flex-col lg:flex-row gap-2 w-full h-full lg:-mt-2">
        <div className="flex flex-col md:flex-row gap-4 justify-between md:justify-center md:mb-12 lg-mb-0 lg:w-1/2">
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
        <div className="w-full lg:w-1/2 h-full">
          <div className="w-full flex flex-col md:flex-row mt-2 md:-mt-2 items-center justify-center gap-4 md:gap-4">
            <ChartDoughnut data={dataChartDoughnut} />
            <ChartBar data={metrics.history} />
          </div>
        </div>
      </div>
    </div>
  );
}
