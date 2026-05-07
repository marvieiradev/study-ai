import { useState } from "react";
import { GameButton } from "./GameButton";
import { FaCheck } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

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
  const [confirmed, setConfirmed] = useState(false);
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
    <div className="flex flex-col h-full justify-between mt-4">
      <h2 className="text-md md:text-lg text-foreground mb-4 md:mb-10">
        {part1}{" "}
        {confirmed ? (
          <span className="text-primary font-semibold bg-primary-light/20 rounded-xl border-none p-1">
            {value}{" "}
          </span>
        ) : (
          <span className="inline-block min-w-16 border-b-2 border-foreground whitespace-nowrap"></span>
        )}{" "}
        {part2}
      </h2>
      <div className="">
        {!confirmed && (
          <div className="flex flex-col gap-3 md:mt-10">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="p-2 mt-4 md:mt-10 rounded-full bg-card-border/50 border-2 border-card-border focus:border-primary outline-none transition text-sm md:text-md"
              placeholder="Digite sua resposta"
            />
            <div className="flex justify-center">
              <GameButton
                action={() => setConfirmed(true)}
                type="positive"
                disabled={!validResponse}
              >
                <FaCheck />
                Confirmar
              </GameButton>
            </div>
          </div>
        )}

        {confirmed && (
          <>
            <p className="text-lg font-semibold mt-10">
              Sua resposta:{" "}
              <span className="font-bold text-primary">{value}</span>
            </p>
            <div className="flex gap-2 mt-2 md:mt-10 w-full max-w-5xl justify-around">
              <GameButton action={() => setConfirmed(false)} type="negative">
                <MdOutlineRefresh className="h-6 w-6" />
                Resetar
              </GameButton>

              <GameButton
                action={check}
                type="positive"
                disabled={!validResponse}
              >
                <IoMdCheckmark className="h-6 w-6" />
                Confirmar
              </GameButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
