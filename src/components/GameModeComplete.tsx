import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { GameButton } from "./GameButton";
import { MdOutlineRefresh } from "react-icons/md";

export function GameModeComplete({
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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg md:text-xl text-gray-700 leading-relaxed items-center text-center mb-4">
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
      <div className="flex gap-2 justify-center w-full mt-2 min-h-12 p-2">
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
      <div className="flex gap-2 mt-2 w-full justify-around">
        <GameButton action={reset} type="negative">
          <MdOutlineRefresh className="h-6 w-6" />
          Resetar
        </GameButton>

        <GameButton action={check} type="positive" disabled={!isValid}>
          <IoMdCheckmark className="h-6 w-6" />
          Confirmar
        </GameButton>
      </div>
    </div>
  );
}
