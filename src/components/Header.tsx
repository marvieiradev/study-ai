import { GiHamburgerMenu } from "react-icons/gi";
import { IoExitOutline, IoTrophySharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  function exit() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <>
      <header className="sticky top-0 z-50 bg-default text-default shadow-xs shadow-foreground/20 border border-card-border flex justify-center items-center p-2">
        <div className="mx-auto flex justify-between items-center w-full px-5">
          <div className="flex gap-2">
            <img
              src="./favicon.svg"
              alt="Logo"
              className="h-8 w-8 mr-2 inline-block"
            />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-secondary to-primary">
              Study AI
            </h1>
          </div>

          <div className="flex md:hidden">
            <button
              className="bg-default border-2 border-primary text-primary rounded-xl flex gap-2 items-center justify-center py-2 px-4 cursor-pointer hover:bg-primary hover:text-default"
              onClick={() => console.log("Teste Mobile")}
            >
              <GiHamburgerMenu className="h- w-4" />
            </button>
          </div>
          <div className="hidden md:flex">
            <div className="flex gap-4">
              <button
                className="bg-default border-2 border-primary text-primary rounded-xl flex gap-2 items-center justify-center p-1 px-4 cursor-pointer hover:bg-primary hover:text-default"
                onClick={() => console.log("Teste")}
              >
                Conquistas
                <IoTrophySharp className="h- w-4" />
              </button>

              <button
                className="bg-default border-2 border-secondary text-secondary rounded-xl flex gap-2 items-center justify-center p-1 px-4 cursor-pointer hover:bg-secondary hover:text-default"
                onClick={exit}
              >
                Sair
                <IoExitOutline className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
