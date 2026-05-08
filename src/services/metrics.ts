import toast from "react-hot-toast";

const METRICS_KEY = "studyai_metrics";
let tempWrongs = 0;
let tempCorrects = 0;

export const defaultMetrics = {
  xp: 0,
  level: 1,
  maxXp: 300,
  totalExercises: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  sessionsCompleted: 0,
  bestScore: 0,
  streak: 0,
  lastStudyDate: null,
  modeQuiz: 0,
  modeComplete: 0,
  modeRespond: 0,
  history: [],
};

export function getMetrics() {
  const data = localStorage.getItem(METRICS_KEY);
  return data ? JSON.parse(data) : defaultMetrics;
}

export function saveMetrics(metrics: any) {
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

export function calculateLevelProgress(xp: number) {
  if (xp < 300) return { level: 1, maxXp: 300 };
  if (xp < 500) return { level: 2, maxXp: 500 };
  if (xp < 1000) return { level: 3, maxXp: 1000 };
  if (xp < 2000) return { level: 4, maxXp: 2000 };
  return { level: 5, maxXp: 5000 };
}

export function updateAfterAnswer(isCorrect: any, type: string) {
  const metrics = getMetrics();

  metrics.totalExercises += 1;

  if (isCorrect) {
    tempCorrects += 1;
    metrics.correctAnswers += 1;
    metrics.xp += 10;

    switch (type) {
      case "quiz":
        metrics.modeQuiz += 1;
        break;
      case "complete":
        metrics.modeComplete += 1;
        break;
      case "input":
        metrics.modeRespond += 1;
        break;
    }
  } else {
    tempWrongs += 1;
    metrics.wrongAnswers += 1;
    metrics.xp += 5;
  }

  metrics.level = calculateLevelProgress(metrics.xp).level;
  metrics.maxXp = calculateLevelProgress(metrics.xp).maxXp;

  saveMetrics(metrics);
}

export function finishSession(score: number) {
  const metrics = getMetrics();

  metrics.sessionsCompleted += 1;

  if (score > metrics.bestScore) {
    metrics.bestScore = score;
  }

  const today = new Date().toISOString().split("T")[0];

  if (metrics.lastStudyDate) {
    const last = new Date(metrics.lastStudyDate);
    const now = new Date(today);

    // @ts-expect-error
    const diff = (now - last) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      metrics.streak += 1;
    } else if (diff > 1) {
      metrics.streak = 1;
    }
  } else {
    metrics.streak = 1;
  }

  metrics.lastStudyDate = today;

  if (!metrics.history) {
    metrics.history = [];
  }

  metrics.history.push({
    date: new Date().toISOString(),
    corrects: tempCorrects,
    wrongs: tempWrongs,
  });

  if (metrics.history.length > 5) {
    metrics.history.shift();
  }

  saveMetrics(metrics);

  tempCorrects = 0;
  tempWrongs = 0;
}

const ACHIEVEMENTS_KEY = "studyai_achievements";

export const achievementsList = [
  {
    id: "first_steps",
    title: "Primeiros Passos",
    description: "Complete 1 exercício",
    condition: (m: any) => m.totalExercises >= 1,
  },
  {
    id: "getting_good",
    title: "Mandando Bem",
    description: "Acerte 10 questões",
    condition: (m: any) => m.correctAnswers >= 10,
  },
  {
    id: "focused",
    title: "Focado",
    description: "Complete 3 sessões",
    condition: (m: any) => m.sessionsCompleted >= 3,
  },
  {
    id: "on_fire",
    title: "On Fire 🔥",
    description: "3 dias de sequência",
    condition: (m: any) => m.streak >= 3,
  },
  {
    id: "master",
    title: "Mestre",
    description: "Alcance nível 5",
    condition: (m: any) => m.level >= 5,
  },
];

export function getAchievements() {
  const data = localStorage.getItem(ACHIEVEMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAchievements(list: any) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(list));
  toast.success(`Nova conquista: ${list[list.length - 1].title}`);
}

export function checkAchievements() {
  const metrics = getMetrics();
  const unlocked = getAchievements();

  let updated = [...unlocked];
  let newOnes: {
    id: string;
    title: string;
    description: string;
    condition: (m: any) => boolean;
  }[] = [];

  achievementsList.forEach((ach) => {
    const alreadyUnlocked = unlocked.find((a: any) => a.id === ach.id);

    if (!alreadyUnlocked && ach.condition(metrics)) {
      updated.push({ ...ach, unlockedAt: new Date().toISOString() });
      newOnes.push(ach);
    }
  });

  if (newOnes.length > 0) {
    saveAchievements(updated);
  }
  return newOnes;
}
