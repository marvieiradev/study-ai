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
    <div className="min-w-25 p-1 pt-1 rounded-2xl flex justify-center gap-1 border border-primary/20 bg-primary/15">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col justify-center text-primary">
          <span className="text-sm text-shadow-xs text-shadow-primary-light">
            {title}
          </span>
          <div className="flex justify-baseline items-center gap-2 ext-shadow-xs text-shadow-primary-light">
            {children}
            <p className="text-lg font-semibold ext-shadow-xs text-shadow-primary-light">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
