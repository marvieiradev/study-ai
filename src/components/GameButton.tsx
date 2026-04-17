import { useEffect, useState } from "react";

export function GameButton({
  type,
  children,
  action,
  disabled,
}: {
  type: string;
  children: React.ReactNode;
  action: () => void;
  disabled?: boolean;
}) {
  const [typeClass, setTypeClass] = useState("");

  useEffect(() => {
    switch (type) {
      case "positive":
        setTypeClass("bg-emerald-500 hover:bg-emerald-700");
        break;
      case "negative":
        setTypeClass("bg-red-500 hover:bg-red-700");
        break;
      case "neutral":
        setTypeClass("bg-sky-500 hover:bg-sky-700");
        break;
      default:
        setTypeClass("bg-black hover:bg-gray-700");
    }
  }, []);

  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`flex gap-2 justify-center items-center text-white p-2 rounded mt-4 w-full max-w-50 transition-all duration-500 ${typeClass} ${
        disabled
          ? "opacity-25 bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
