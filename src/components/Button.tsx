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
          className={`flex items-center gap-2 mb:gap-4 text-sm md:text-base px-6 py-2 bg-linear-to-r from-secondary to-primary rounded-2xl text-default font-medium hover:opacity-80 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={`flex items-center gap-2 mb:gap-4 text-sm md:text-base px-6 py-2 bg-default border-2 border-primary rounded-2xl text-primary font-medium hover:opacity-80 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
