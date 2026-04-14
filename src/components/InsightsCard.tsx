export function InsightsCard({ text }: { text: string }) {
  return (
    <div className="bg-gray-50 border border-red-200/50 rounded-2xl p-2 shadow-sm shadow-red-500/10 hover:shadow-red-500/30 transition">
      <p className="space-y-2 text-sm text-start text-gray-600">{text}</p>
    </div>
  );
}
