import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

export function ChartDoughnut({ data }: { data: any }) {
  const [modeQuiz, setModeQuiz] = useState(0);
  const [modeComplete, setModeComplete] = useState(0);
  const [modeRespond, setModeRespond] = useState(0);
  const colors = {
    primary: "#5d30ff",
    secondary: "#2b7fff",
    success: "#00c950",
  };

  useEffect(() => {
    setModeQuiz(data.modeQuiz);
    setModeComplete(data.modeComplete);
    setModeRespond(data.modeRespond);
  }, []);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [modeQuiz, modeComplete, modeRespond],
        backgroundColor: [colors.primary, colors.secondary, colors.success],
        borderColor: [colors.primary, colors.secondary, colors.success],
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-foreground">Desempenho Exercicios</h2>
      <div className="flex justify-center items-center">
        <div className="w-27 h-27 lg:h-25 lg:w-25">
          <Doughnut data={chartData} />
        </div>
        <div className="flex flex-col bg-primary/10 p-2 rounded-lg text-foreground text-xs justify-center items-start gap-2">
          <div className="flex gap-2 items-center">
            <span
              className="w-3 h-3 rounded-full inline-block mr-1"
              style={{ backgroundColor: colors.primary }}
            ></span>
            <p>Modo Quiz</p>
          </div>

          <div className="flex gap-2 items-center">
            <span
              className="w-3 h-3 rounded-full inline-block mr-1"
              style={{ backgroundColor: colors.secondary }}
            ></span>
            <p>Modo Completar</p>
          </div>

          <div className="flex gap-2 items-center">
            <span
              className="w-3 h-3 rounded-full inline-block mr-1"
              style={{ backgroundColor: colors.success }}
            ></span>
            <p>Modo Responder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
