import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type HistoryItem = {
  date: string;
  wrongs: number;
  corrects: number;
};

type Props = {
  data: HistoryItem[];
};

const colors = {
  correct: "#00c950",
  wrong: "#fb2c36",
};

export function ChartBar({ data }: Props) {
  // Labels do gráfico (datas)
  const labels = data.map((item) =>
    new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    })
  );

  const chartData = {
    labels,

    datasets: [
      {
        label: "Certas",
        data: data.map((item) => item.corrects),
        backgroundColor: colors.correct,
      },

      {
        label: "Erradas",
        data: data.map((item) => item.wrongs),
        backgroundColor: colors.wrong,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-foreground">Histórico de Sessões</h2>
      <div className="h-30">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}
