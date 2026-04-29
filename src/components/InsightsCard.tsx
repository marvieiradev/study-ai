export function InsightsCard({ text }: { text: string }) {
  return (
    <div className="bg-primary-light/10 border border-primary/10 rounded-2xl p-2 shadow-sm shadow-secondary/10 hover:shadow-secondary/30 transition">
      <p className="space-y-2 text-sm text-start text-foreground">{text}</p>
    </div>
  );
}
