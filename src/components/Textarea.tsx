export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-2 md:p-3 text-sm md:text-base rounded-xl border outline-none ${className}`}
      {...props}
    />
  );
}
