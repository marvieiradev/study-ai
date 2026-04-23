import { useState } from "react";
import { GameButton } from "./GameButton";
import { FaCheck } from "react-icons/fa";

export function GameModeRespond({
  exercise,
  onCorrect,
  onWrong,
}: {
  exercise: any;
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const [value, setValue] = useState("");
  const [part1, part2] = exercise.question.split("___");
  const validResponse =
    value && value.trim() !== "" && value.trim().length >= 3;
  const normalizeText = (text = "") =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .trim();

  function check() {
    if (normalizeText(value) === normalizeText(exercise.answer)) {
      onCorrect();
    } else {
      onWrong();
    }
    setValue("");
  }

  return (
    <>
      <h2 className="text-lg md:text-xl text-foreground mb-4">
        {part1}{" "}
        <span className="inline-block min-w-16 border-b-2 border-foreground whitespace-nowrap"></span>{" "}
        {part2}
      </h2>
      <div className="flex flex-col gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-3 mt-4 rounded bg-default border-2 border-card-border focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
          placeholder="Digite sua resposta"
        />
        <div className="flex justify-center">
          <GameButton action={check} type="positive" disabled={!validResponse}>
            <FaCheck />
            Confirmar
          </GameButton>
        </div>
      </div>
    </>
  );
}
