export function InsightsCard({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 items-center bg-primary-light/10 border border-primary/10 rounded-2xl p-2 shadow-sm shadow-secondary/10 hover:shadow-secondary/30 transition hover:scale-103 mx-2 cursor-pointer">
      <div className="flex justify-center items-center bg-secondary-light/20 rounded-full p-2 text-secondary hover:bg-secondary hover:text-default">
        {children}
      </div>
      <p className="space-y-2 text-sm text-start text-foreground">{text}</p>
    </div>
  );
}
