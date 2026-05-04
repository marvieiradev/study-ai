import { useNavigate } from "react-router-dom";
import { GameButton } from "./GameButton";
import { IoMdCheckmark, IoMdClose, IoMdTime } from "react-icons/io";
import { CardMetrics } from "./CardMetrics";
import { FaStar } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="w-full">
      {hasWon ? (
        <div className="flex flex-col gap-6 h-full bg-success-light/15 text-foreground-dark p-6 rounded-xl w-full max-w-3xl mx-auto items-center justify-around">
          <IoMdCheckmark className="mx-auto mb-4 h-25 w-25 text-success" />
          <h1 className="text-3xl font-bold text-foreground-dark mb-4">
            Você Venceu!
          </h1>
          <p className="text-lg text-foreground">Obrigado por jogar!</p>
          <div className="flex gap-2 mt-2 mb-12">
            <CardMetrics title="XP" content={`${xp}`}>
              <FaStar className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics title="Precisão" content={`${precision}%`}>
              <TbTargetArrow className="h-5 w-5" />
            </CardMetrics>

            <CardMetrics title="Tempo" content={formatTime(time)}>
              <IoMdTime className="h-5 w-5" />
            </CardMetrics>
          </div>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Concluir
          </GameButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6 h-full bg-error-light/15 text-foreground-dark p-6 rounded-xl w-full max-w-3xl mx-auto items-center justify-around">
          <IoMdClose className="mx-auto mb-4 mt-8 h-25 w-25 text-error" />
          <h1 className="text-3xl font-bold text-foreground-dark mb-4">
            Fim de Jogo
          </h1>
          <p className="text-lg text-foreground">Obrigado por jogar!</p>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Sair
          </GameButton>
        </div>
      )}
    </div>
  );
}
