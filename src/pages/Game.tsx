import { useState, type Key } from "react";

export default function Game({ studyData }: { studyData: any }) {
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const exercises = studyData.exercicios || [];
  const exercise = exercises[current];

  function next() {
    if (current + 1 < exercises.length) {
      setCurrent(current + 1);
    } else {
      alert("Fim! Pontuação: " + score);
    }
  }

  function handleCorrect() {
    setScore(score + 10);
    next();
  }

  function handleWrong() {
    setLives(lives - 1);
    if (lives - 1 <= 0) {
      alert("Game Over 😢");
      setCurrent(0);
      setLives(3);
      setScore(0);
    }
  }

  if (!exercise) return <p className="text-white">Sem exercícios</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-6 max-w-xl mx-auto">
      <div className="flex justify-between">
        <p>❤️ {lives}</p>
        <p>⚡ {score}</p>
      </div>

      <h2 className="text-xl text-cyan-400">
        {exercise.question || exercise.sentence}
      </h2>

      {exercise.type === "quiz" && (
        <div className="flex flex-col gap-3">
          {exercise.options.map((opt: string, i: Key | null | undefined) => (
            <button
              key={i}
              onClick={() =>
                opt === exercise.answer ? handleCorrect() : handleWrong()
              }
              className="bg-zinc-800 p-3 rounded-xl hover:bg-cyan-500/30"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {exercise.type === "input" && (
        <InputMode
          answer={exercise.answer}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}

      {exercise.type === "complete" && (
        <CompleteMode
          exercise={exercise}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
}

function InputMode({
  answer,
  onCorrect,
  onWrong,
}: {
  answer: string;
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const [value, setValue] = useState("");

  function check() {
    if (value.toLowerCase().trim() === answer.toLowerCase()) {
      onCorrect();
    } else {
      onWrong();
    }
    setValue("");
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-3 rounded bg-zinc-800"
        placeholder="Digite sua resposta"
      />
      <button onClick={check} className="bg-cyan-500 p-2 rounded">
        Confirmar
      </button>
    </div>
  );
}

function CompleteMode({
  exercise,
  onCorrect,
  onWrong,
}: {
  exercise: any;
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(() =>
    [...exercise.answers].sort(() => Math.random() - 0.5)
  );

  function add(word: string, index: number) {
    setSelected([...selected, word]);
    setOptions(options.filter((_, i) => i !== index));
  }

  function reset() {
    setSelected([]);
    setOptions([...exercise.answers].sort(() => Math.random() - 0.5));
  }

  function check() {
    const correct = exercise.answers.join(" ").toLowerCase();
    const user = selected.join(" ").toLowerCase();

    if (correct === user) {
      onCorrect();
    } else {
      onWrong();
    }

    reset();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg">{exercise.sentence.replace(/___/g, "_____")}</p>

      <div className="flex gap-2 flex-wrap">
        {options.map((word, i) => (
          <button
            key={i}
            onClick={() => add(word, i)}
            className="bg-zinc-700 px-3 py-1 rounded hover:bg-cyan-500/30"
          >
            {word}
          </button>
        ))}
      </div>

      <p className="text-cyan-400">Resposta: {selected.join(" ")}</p>

      <div className="flex gap-2">
        <button onClick={check} className="bg-cyan-500 px-3 py-1 rounded">
          Confirmar
        </button>
        <button onClick={reset} className="bg-red-500 px-3 py-1 rounded">
          Resetar
        </button>
      </div>
    </div>
  );
}
