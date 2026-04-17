import { useNavigate } from "react-router-dom";
import { GameButton } from "./GameButton";

export default function GameOver({ open }: { open: boolean }) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="flex flex-col items-center justify-center h-full fixed inset-x-0 z-50 bg-white p-6 gap-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Fim de Jogo</h1>
      <p className="text-lg text-gray-600">Obrigado por jogar!</p>
      <GameButton action={() => navigate("/dashboard")} type="neutral">
        Sair
      </GameButton>
    </div>
  );
}
