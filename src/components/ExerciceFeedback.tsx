import { useEffect, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export default function ExerciceFeedback({
  open,
  onContinue,
  isCorrect,
}: {
  open: boolean;
  onContinue?: () => void;
  isCorrect: boolean;
}) {
  if (!open) return null;

  const [typeClass, setTypeClass] = useState("");

  useEffect(() => {
    if (isCorrect) {
      setTypeClass(
        "bg-emerald-500 text-emerald-500 border-t-4 border-emerald-400"
      );
    } else {
      setTypeClass("bg-red-500 text-red-500 border-t-4 border-red-400");
    }
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-3xl flex justify-end">
        <div
          className={`rounded-t-lg p-6 w-full h-60 text-center ${typeClass}`}
        >
          <div>
            {isCorrect ? (
              <IoMdCheckmark className="mx-auto mb-4 h-12 w-12 text-white" />
            ) : (
              <IoMdClose className="mx-auto mb-4 h-12 w-12 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
          </h2>
          <button
            className={`${
              isCorrect ? "text-emerald-500" : "text-red-500"
            } bg-white px-4 py-2 rounded-xl text-semibold`}
            onClick={onContinue || (() => {})}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
