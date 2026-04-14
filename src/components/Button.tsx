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
      className={`px-4 py-2 bg-sky-500 text-white font-medium hover:opacity-80 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
