import { useEffect, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export default function GameFeedback({
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
      setTypeClass("bg-success text-success border-t-4 border-success-light");
    } else {
      setTypeClass("bg-error text-error border-t-4 border-error-light");
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
              <IoMdCheckmark className="mx-auto mb-4 h-12 w-12 text-default" />
            ) : (
              <IoMdClose className="mx-auto mb-4 h-12 w-12 text-default" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-default">
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
          </h2>
          <button
            className={`${
              isCorrect ? "text-success" : "text-error"
            } bg-default px-4 py-2 rounded-xl text-semibold cursor-pointer`}
            onClick={onContinue || (() => {})}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
