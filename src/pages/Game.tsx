import { useState, type Key } from "react";
import {
  updateAfterAnswer,
  finishSession,
  checkAchievements,
} from "../services/metrics";
import { useNavigate } from "react-router-dom";

export default function Game({ studyData }: { studyData: any }) {
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const exercises = studyData.exercicios || [];
  const exercise = exercises[current];

  const navigate = useNavigate();

  function next() {
    if (current + 1 < exercises.length) {
      setCurrent(current + 1);
    } else {
      alert("Fim! Pontuação: " + score);
      finishSession(score);
      checkAchievements();
      navigate("/dashboard");
    }
  }

  function handleCorrect() {
    setScore(score + 10);
    updateAfterAnswer(true);
    checkAchievements();
    next();
  }

  function handleWrong() {
    setLives(lives - 1);
    if (lives - 1 <= 0) {
      alert("Game Over 😢");
      setCurrent(0);
      setLives(3);
      setScore(0);
      navigate("/dashboard");
    }
    updateAfterAnswer(false);
    checkAchievements();
  }

  if (!exercise) return <p className="text-white">Sem exercícios</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-6 max-w-xl mx-auto">
      <div className="flex justify-between">
        <p>❤️ {lives}</p>
        <p>⚡ {score}</p>
      </div>

      <h2 className="text-xl text-cyan-400">{exercise.question}</h2>

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
  const normalizeText = (text = "") =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .trim();

  function check() {
    if (normalizeText(value) === normalizeText(answer)) {
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

  function add(word: any, index: number) {
    if (selected.length >= 3) return;
    // @ts-expect-error
    setSelected([...selected, word]);
    setOptions(options.filter((_, i) => i !== index));
  }

  function remove(wordIndex: number) {
    const word = selected[wordIndex];
    const newSelected = selected.filter((_, i) => i !== wordIndex);
    setSelected(newSelected);
    setOptions([...options, word]);
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
    <div className="flex flex-col gap-5">
      <h2 className="text-xl text-cyan-400 flex flex-wrap items-center gap-2">
        {exercise.sentence.split("___").map((part: string, index: number) => (
          <span key={index} className="flex items-center gap-2">
            {part}

            {index < exercise.answers.length && (
              <span
                onClick={() => selected[index] && remove(index)}
                className={`min-w-20 h-10 px-2 flex items-center justify-center rounded-xl border cursor-pointer transition
            ${
              selected[index]
                ? "bg-cyan-500 text-black"
                : "bg-zinc-800 border-zinc-600 text-gray-500"
            }`}
              >
                {selected[index] || "___"}
              </span>
            )}
          </span>
        ))}
      </h2>

      {/* Opções embaralhadas */}
      <div className="flex gap-2 flex-wrap">
        {options.map((word, i) => (
          <button
            key={i}
            onClick={() => add(word, i)}
            className="bg-zinc-700 px-3 py-1 rounded hover:bg-cyan-500/30 transition"
          >
            {word}
          </button>
        ))}
      </div>

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
