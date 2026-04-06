export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-3 rounded-xl border outline-none ${className}`}
      {...props}
    />
  );
}
