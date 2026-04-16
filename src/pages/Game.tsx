import { useState, type Key } from "react";
import {
  updateAfterAnswer,
  finishSession,
  checkAchievements,
} from "../services/metrics";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { TiFlash } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import ExerciceFeedback from "../components/ExerciceFeedback";

export default function Game({ studyData }: { studyData: any }) {
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const exercises = studyData.exercicios || [];
  const exercise = exercises[current];

  const navigate = useNavigate();

  function handleNext() {
    if (current + 1 < exercises.length) {
      setCurrent(current + 1);
    } else {
      alert("Fim! Pontuação: " + score);
      finishSession(score);
      checkAchievements();
      navigate("/dashboard");
    }
    setShowFeedback(false);
  }

  function handleCorrect() {
    setIsCorrect(true);
    setScore(score + 10);
    updateAfterAnswer(true);
    checkAchievements();
    setIsCorrect(true);
    setShowFeedback(true);
  }

  function handleWrong() {
    setLives(lives - 1);
    setIsCorrect(false);
    setShowFeedback(true);
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
    <div className="min-h-screen w-full bg-white text-gray-800 p-6 flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <GoHeartFill className="w-5 h-5 text-red-600" />
          <span className="text-gray-600 text-lg font-semibold"> {lives}</span>
        </div>
        <div className="flex gap-2 items-center">
          <TiFlash className="w-5 h-5 text-yellow-600" />
          <span className="text-gray-600 text-lg font-semibold"> {score}</span>
        </div>
        <div className="flex gap-2 items-center ">
          <button
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <AiFillCloseCircle className="w-7 h-7 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
          <div
            className={`bg-linear-to-r from-violet-600 to-sky-500 h-4 rounded-full transition-all duration-500`}
            style={{
              width: `${(current / exercises.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-gray-600 font-semibold text-md">
          Exercício {current + 1}/{exercises.length}
        </p>
      </div>

      {exercise.type === "quiz" && (
        <>
          <h2 className="text-xl text-gray-700 mb-2">{exercise.question}</h2>
          <div className="flex flex-col gap-4">
            {exercise.options.map((opt: string, i: Key | null | undefined) => (
              <button
                key={i}
                onClick={() =>
                  opt === exercise.answer ? handleCorrect() : handleWrong()
                }
                className="bg-white text-gray-600 border-2 border-sky-500 p-3 rounded-2xl hover:border-violet-600 transition-all duration-500 text-center"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
      {exercise.type === "input" && (
        <>
          <h2 className="text-xl text-gray-700 mb-2">{exercise.question}</h2>
          <InputMode
            answer={exercise.answer}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        </>
      )}
      {exercise.type === "complete" && (
        <CompleteMode
          exercise={exercise}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
      <ExerciceFeedback
        open={showFeedback}
        onContinue={handleNext}
        isCorrect={isCorrect}
      />
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
        className="p-3 mt-8 rounded bg-gray-50 border-2 border-gray-200 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none transition"
        placeholder="Digite sua resposta"
      />
      <div className="flex justify-center">
        <button
          onClick={check}
          className="text-white bg-sky-500 hover:bg-violet-600 p-2 rounded mt-4 w-full max-w-50 transition-all duration-500 cursor-pointer"
        >
          Confirmar
        </button>
      </div>
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
  const [isValid, setIsValid] = useState(false);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(() =>
    [...exercise.answers].sort(() => Math.random() - 0.5)
  );

  function add(word: any, index: number) {
    if (selected.length >= 3) return;
    // @ts-expect-error
    setSelected([...selected, word]);
    setOptions(options.filter((_, i) => i !== index));
    if (selected.length == exercise.answers.length - 1) {
      setIsValid(true);
    }
  }

  function remove(wordIndex: number) {
    const word = selected[wordIndex];
    const newSelected = selected.filter((_, i) => i !== wordIndex);
    setSelected(newSelected);
    setOptions([...options, word]);
    setIsValid(false);
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

  const parts = exercise.sentence.split("___");

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl text-gray-700 leading-relaxed items-center text-center">
        {parts.map((part: string, index: number) => (
          <span key={index}>
            {part}

            {index < exercise.answers.length && (
              <span
                onClick={() => selected[index] && remove(index)}
                className={`inline-block align-middle min-w-22.5 px-1 border-b-2 -mt-0.5 cursor-pointer whitespace-nowrap
            ${
              selected[index]
                ? "text-sky-500 bg-gray-100 rounded-xl border-none"
                : "text-transparent border-gray-600"
            }
          `}
              >
                {selected[index] || "___"}
              </span>
            )}
          </span>
        ))}
      </h2>
      <div className="flex gap-2 justify-center w-full mt-8 min-h-12 p-2">
        {options.map((word, i) => (
          <button
            key={i}
            onClick={() => add(word, i)}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-sky-500 transition"
          >
            {word}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-20 w-full justify-around">
        <button
          onClick={check}
          disabled={!isValid}
          className="text-white bg-sky-500 p-2 rounded mt-4 w-full max-w-30 transition-all duration-500 cursor-pointer"
        >
          Confirmar
        </button>
        <button
          onClick={reset}
          className="text-white bg-red-500 p-2 rounded mt-4 w-full max-w-30 transition-all duration-500 cursor-pointer"
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
