export function Button({
  children,
  type,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  type: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <>
      {type === "normal" ? (
        <button
          className={`flex items-center gap-4 px-6 py-2 bg-linear-to-r from-violet-600 to-sky-500 rounded-2xl text-white font-medium hover:opacity-80 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={`flex items-center gap-4 px-6 py-2 bg-white border-2 border-sky-500 rounded-2xl text-sky-500 font-medium hover:opacity-80 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
