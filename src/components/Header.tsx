export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white text-white shadow-lg flex justify-center items-center p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
          <div className="flex gap-2">
            <img
              src="./favicon.svg"
              alt="Logo"
              className="h-8 w-8 mr-2 inline-block"
            />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-sky-500">
              Study AI
            </h1>
          </div>
        </div>
      </header>
      <div className="h-0.5 bg-linear-to-r from-violet-600 to-sky-500"></div>
    </>
  );
}
