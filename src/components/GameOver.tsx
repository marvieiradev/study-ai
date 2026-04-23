import { useNavigate } from "react-router-dom";
import { GameButton } from "./GameButton";
import { IoMdCheckmark, IoMdClose, IoMdTime } from "react-icons/io";
import { CardMetrics } from "./CardMetrics";
import { FaStar } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

export default function GameOver({
  open,
  result,
  time,
  precision,
  xp,
}: {
  open: boolean;
  result: boolean;
  time: number;
  precision: number;
  xp: number;
}) {
  const hasWon = result ? true : false;
  const navigate = useNavigate();
  if (!open) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      {hasWon ? (
        <div className="flex flex-col items-center justify-around h-full fixed inset-x-0 z-50 bg-default p-6 gap-4">
          <div>
            <IoMdCheckmark className="mx-auto mb-4 h-25 w-25 text-success" />
            <h1 className="text-3xl font-bold text-foreground-dark mb-4">
              Você Venceu!
            </h1>
            <p className="text-lg text-foreground">Obrigado por jogar!</p>
            <div className="flex gap-2 mt-2 mb-12">
              <CardMetrics title="XP" style="bg-yellow-500">
                <FaStar className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-500">{xp}</span>
              </CardMetrics>

              <CardMetrics title="Precisão" style="bg-sky-500">
                <TbTargetArrow className="h-5 w-5 text-sky-500" />
                <span className="text-sky-500">{precision}%</span>
              </CardMetrics>

              <CardMetrics title="Tempo" style="bg-emerald-500">
                <IoMdTime className="h-5 w-5 text-emerald-500" />
                <span className="text-emerald-500">{formatTime(time)}</span>
              </CardMetrics>
            </div>
          </div>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Concluir
          </GameButton>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around h-full fixed inset-x-0 z-50 bg-default p-6 gap-4">
          <div>
            <IoMdClose className="mx-auto mb-4 h-25 w-25 text-error" />
            <h1 className="text-3xl font-bold text-foreground-dark mb-4">
              Fim de Jogo
            </h1>
            <p className="text-lg text-foreground">Obrigado por jogar!</p>
          </div>
          <GameButton action={() => navigate("/dashboard")} type="neutral">
            Sair
          </GameButton>
        </div>
      )}
    </>
  );
}
