export function CardResults({
  title,
  content,
  children,
  color,
}: {
  title: string;
  content: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`min-w-25 p-1 pt-1 rounded-2xl flex justify-center gap-1 bg-${color}`}
    >
      <div className="flex gap-2 items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm md:text-base text-default mb-1">
            {title}
          </span>
          <div
            className={`flex justify-evenly items-center gap-2 bg-default rounded-xl px-4 py-2 text-${color}`}
          >
            {children}
            <p className="text-md font-semibold ">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
