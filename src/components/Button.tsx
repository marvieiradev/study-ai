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
          className={`flex items-center gap-2 mb:gap-4 text-sm px-6 py-2 bg-linear-to-r from-primary to-primary-accent rounded-full text-default font-medium hover:bg-linear-to-r hover:from-primary-dark hover:to-primary-dark hover:shadow-sm hover:shadow-primary-light cursor-pointer`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={`flex items-center gap-2 mb:gap-4 text-sm px-6 py-2 bg-primary-light/10 border-2 border-primary-accent rounded-full text-primary-accent font-medium hover:text-default hover:bg-primary-accent hover:shadow-sm hover:shadow-primary-light cursor-pointer`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
