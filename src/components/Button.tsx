export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
