export function Button({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={`flex items-center gap-4 px-6 py-2 bg-linear-to-r from-violet-600 to-sky-500 rounded-2xl text-white font-medium hover:opacity-80 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
