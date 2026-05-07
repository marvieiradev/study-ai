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
      setTypeClass("bg-success text-success border-t-6 border-success-light");
    } else {
      setTypeClass("bg-error text-error border-t-6 border-error-light");
    }
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-3xl flex justify-end">
        <div
          className={`rounded-t-xl p-6 w-full h-75 text-center ${typeClass}`}
        >
          <div className="flex justify-center items-center bg-default rounded-full p-4 w-20 h-20 mx-auto">
            {isCorrect ? (
              <IoMdCheckmark className="mx-auto h-12 w-12 text-success" />
            ) : (
              <IoMdClose className="mx-auto h-12 w-12 text-error" />
            )}
          </div>
          <h2 className="text-2xl font-bold mt-5 mb-5 text-default">
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
          </h2>
          <button
            className={`${
              isCorrect ? "text-success" : "text-error"
            } bg-default px-4 py-2 rounded-full text-semibold cursor-pointer`}
            onClick={onContinue || (() => {})}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
