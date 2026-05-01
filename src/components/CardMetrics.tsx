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
    <div className="min-w-20 md:min-w-22 p-1 pt-1 rounded-2xl flex justify-center gap-1 bg-primary-light/25">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col justify-center text-primary-accent">
          <span className="text-xs text-shadow-xs text-shadow-primary-light">
            {title}
          </span>
          <div className="flex justify-baseline items-center gap-2 ext-shadow-xs text-shadow-primary-light">
            {children}
            <p className="text-md font-semibold ext-shadow-xs text-shadow-primary-light">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
