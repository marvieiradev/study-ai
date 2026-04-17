import { useState } from "react";
import { GameButton } from "./GameButton";
import { FaCheck } from "react-icons/fa";

export function GameModeQuiz({
  exercise,
  onCorrect,
  onWrong,
}: {
  exercise: any;
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const [selected, setSelected] = useState("");

  function check() {
    selected === exercise.answer ? onCorrect() : onWrong();
    setSelected("");
  }
  return (
    <>
      <h2 className="text-lg md:text-xl text-gray-700 mb-4">
        {exercise.question}
      </h2>
      <div className="flex flex-col gap-4">
        {exercise.options.map((opt: string, i: number) => (
          <button
            key={i}
            onClick={() => setSelected(opt)}
            className={` border-2 border-sky-500 p-3 rounded-2xl hover:border-violet-600 transition-all duration-500 text-center cursor-pointer ${
              selected === opt
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-gray-600"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <GameButton action={check} type="positive" disabled={!selected}>
          <FaCheck />
          Confirmar
        </GameButton>
      </div>
    </>
  );
}
