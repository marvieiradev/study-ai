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
          disabled={props.disabled}
          className={`flex items-center gap-2 mb:gap-4 text-sm px-6 py-2 bg-linear-to-r from-primary to-secondary rounded-full text-default font-medium hover:bg-linear-to-r hover:from-primary-dark hover:to-primary-dark hover:shadow-sm hover:shadow-primary-light cursor-pointer ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={props.disabled}
          className={`flex items-center gap-2 mb:gap-4 text-sm px-6 py-2 bg-primary-light/10 border-2 border-secondary rounded-full text-secondary font-medium hover:text-default hover:bg-secondary hover:shadow-sm hover:shadow-secondary-light cursor-pointer ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
