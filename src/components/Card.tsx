export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-gray-50 border-2 rounded-lg border-gray-200 p-4 transition overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-start">
          {title}
        </h2>
        <div className="space-y-2 text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}
