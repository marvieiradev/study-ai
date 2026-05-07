import { useNavigate } from "react-router-dom";
import { GameButton } from "./GameButton";
import { IoMdCheckmark, IoMdClose, IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { useEffect, useState } from "react";
import { CardResults } from "./CardResults";

export function GameOver({
  result,
  time,
  precision,
  xp,
}: {
  result: boolean;
  time: number;
  precision: number;
  xp: number;
}) {
  const hasWon = result ? true : false;
  const navigate = useNavigate();
  const [endPhrase, setEndPhrase] = useState("");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const winPhrases = [
    "Parabéns! Você é o melhor!",
    "Excelente desempenho!",
    "Você é um verdadeiro mestre!",
  ];

  const losePhrases = [
    "Não desista! Tente novamente.",
    "Você pode fazer melhor!",
    "Continue praticando!",
  ];

  useEffect(() => {
    if (hasWon) {
      setEndPhrase(winPhrases[Math.floor(Math.random() * winPhrases.length)]);
    } else {
      setEndPhrase(losePhrases[Math.floor(Math.random() * losePhrases.length)]);
    }
  }, [hasWon]);

  return (
    <div className="w-full">
      {hasWon ? (
        <div className="flex flex-col gap-6 h-full bg-success-light/15 text-foreground-dark p-6 rounded-xl w-full max-w-3xl mx-auto items-center justify-around">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center p-4 bg-success rounded-full h-27 w-27">
              <IoMdCheckmark className="mx-auto h-25 w-25 text-default" />
            </div>
            <h1 className="text-3xl font-bold text-foreground-dark mt-8">
              Você Venceu!
            </h1>
          </div>
          <p className="text-lg text-foreground">{endPhrase}</p>
          <div className="flex gap-2 mt-2 mb-12">
            <CardResults title="XP" color="secondary" content={`${xp}`}>
              <FaStar className="h-5 w-5" />
            </CardResults>

            <CardResults
              title="Precisão"
              color="primary"
              content={`${precision}%`}
            >
              <TbTargetArrow className="h-5 w-5" />
            </CardResults>

            <CardResults
              title="Tempo"
              color="success"
              content={formatTime(time)}
            >
              <IoMdTime className="h-5 w-5" />
            </CardResults>
          </div>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Concluir
          </GameButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6 h-full bg-error-light/15 text-foreground-dark p-6 rounded-xl w-full max-w-3xl mx-auto items-center justify-around">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center p-4 bg-error rounded-full h-27 w-27">
              <IoMdClose className="mx-auto h-25 w-25 text-default" />
            </div>
            <h1 className="text-3xl font-bold text-foreground-dark mt-8">
              Fim de Jogo
            </h1>
          </div>
          <p className="text-lg text-foreground">{endPhrase}</p>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Sair
          </GameButton>
        </div>
      )}
    </div>
  );
}
