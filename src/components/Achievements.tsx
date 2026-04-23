import { getAchievements } from "../services/metrics";

export function Achievements() {
  const achievements = getAchievements();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-primary mb-2"></h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.length === 0 && (
          <p className="text-foreground-light">Nenhuma conquista ainda</p>
        )}

        {achievements.map((ach: any) => (
          <div
            key={ach.id}
            className="bg-foreground-dark border border-warning/30 p-3 rounded-xl"
          >
            <p className="text-warning font-semibold">{ach.title}</p>
            <p className="text-xs text-foreground-light">{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
