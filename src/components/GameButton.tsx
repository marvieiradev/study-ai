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
        setTypeClass("bg-success hover:bg-success-dark");
        break;
      case "negative":
        setTypeClass("bg-error hover:bg-error-dark");
        break;
      case "neutral":
        setTypeClass("bg-primary hover:bg-primary-dark");
        break;
      default:
        setTypeClass("bg-foreground-dark hover:bg-foreground");
    }
  }, []);

  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`flex gap-2 justify-center items-center text-default p-2 rounded mt-4 w-full max-w-50 transition-all duration-500 ${typeClass} ${
        disabled
          ? "opacity-25 bg-foreground-light cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
