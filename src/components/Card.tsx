export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-4 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition">
      <h2 className="text-xl font-semibold text-cyan-300 mb-3">{title}</h2>
      <div className="space-y-2 text-sm text-gray-300">{children}</div>
    </div>
  );
}
