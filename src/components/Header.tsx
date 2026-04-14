export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-blue-500 text-white shadow-lg flex justify-center items-center p-2">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full px-4">
        <div className="flex gap-2">
          <img
            src="./favicon.svg"
            alt="Logo"
            className="h-8 w-8 mr-2 inline-block"
          />
          <h1 className="text-2xl font-bold">Study AI</h1>
        </div>
      </div>
    </header>
  );
}
