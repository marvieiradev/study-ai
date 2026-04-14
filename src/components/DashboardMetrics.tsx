import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics";

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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
          <div
            className={`bg-blue-500 h-4 rounded-full transition-all duration-500`}
            style={{
              width: `${(1000 - metrics.xp) / 10}%`,
            }}
          />
        </div>
        <p className="text-gray-600 text-sm">XP: {metrics.xp}/1000</p>
      </div>

      <Card title="Nível" value={metrics.level} />
      <Card title="Precisão" value={`${accuracy}%`} />
      <Card title="Sequência" value={`${metrics.streak} dias`} />
      <Card title="Exercícios" value={metrics.totalExercises} />
      <Card title="Sessões" value={metrics.sessionsCompleted} />
      <Card title="Melhor Score" value={metrics.bestScore} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl border border-cyan-500/20 shadow-md">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold text-cyan-400">{value}</h2>
    </div>
  );
}
