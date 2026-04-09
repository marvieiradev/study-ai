import { getAchievements } from "../services/metrics";

export function Achievements() {
  const achievements = getAchievements();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-cyan-400 mb-2"></h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.length === 0 && (
          <p className="text-gray-500">Nenhuma conquista ainda</p>
        )}

        {achievements.map((ach: any) => (
          <div
            key={ach.id}
            className="bg-zinc-900 border border-yellow-500/30 p-3 rounded-xl"
          >
            <p className="text-yellow-400 font-semibold">{ach.title}</p>
            <p className="text-xs text-gray-400">{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
