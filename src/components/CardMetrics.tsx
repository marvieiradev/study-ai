export function CardMetrics({
  title,
  children,
  style,
}: {
  title: string;
  children: React.ReactNode;
  style: string;
}) {
  return (
    <div
      className={`min-w-25 h-17 p-1 pt-1 rounded-xl flex flex-col justify-between gap-1 ${style}`}
    >
      <span className="text-center text-white font-semibold text-xs md:text-sm">
        {title}
      </span>
      <div
        className={`bg-white h-12 rounded-lg text-base md:text-lg font-bold flex items-center justify-center gap-2 px-1`}
      >
        {children}
      </div>
    </div>
  );
}
