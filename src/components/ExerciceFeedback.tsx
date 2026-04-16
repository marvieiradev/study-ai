export default function ExerciceFeedback({
  open,
  onContinue,
  isCorrect,
}: {
  open: boolean;
  onContinue?: () => void;
  isCorrect: boolean;
}) {
  //type: "correct" | "incorrect"
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
        </h2>
        <p className="text-gray-700 mb-6">
          {isCorrect
            ? "Parabéns, você acertou a resposta!"
            : "Tente novamente."}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onContinue || (() => {})}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
