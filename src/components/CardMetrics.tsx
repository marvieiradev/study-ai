export function CardMetrics({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-15 p-1 pt-1 rounded-2xl flex justify-center gap-1 border-2 border-secondary/40 bg-secondary/5">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col justify-center text-secondary">
          <p className="text-sm">{title}</p>
          <div className="flex justify-baseline items-center gap-2">
            {children}
            <p className="text-lg font-semibold">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
