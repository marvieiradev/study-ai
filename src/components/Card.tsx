export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-1 flex-col overflow-hidden bg-card-background border rounded-lg border-card-border p-4 transition shadow-sm shadow-foreground/20">
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card-background">
      <div className="flex justify-between top-0 sticky z-50 text-lg font-semibold text-foreground-dark mb-2 px-2">
        {children}
      </div>
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-auto overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      <div className="space-y-2 text-sm text-foreground">{children}</div>
    </div>
  );
}
