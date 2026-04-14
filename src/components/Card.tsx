export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-gray-50 border border-sky-200/50 p-4 shadow-sm shadow-cyan-500/10 hover:shadow-cyan-500/30 transition overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-start">
          {title}
        </h2>
        <div className="space-y-2 text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}
