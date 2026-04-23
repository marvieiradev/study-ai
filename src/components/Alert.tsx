import { Button } from "./Button";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

export function Alert({
  open,
  onYes,
  onNo,
}: {
  open: boolean;
  onYes: () => void;
  onNo: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <div className="w-full h-full bg-card-background/90 fixed inset-x-0 z-50 p-5">
        <div className="flex justify-center items-center h-full w-full">
          <div className="h-xl w-xl flex flex-col items-center bg-card-background border-4 border-card-border rounded-2xl text-foreground-dark p-4 inset-x-0 z-50">
            <div className="justify-center items-center w-full flex flex-col gap-6 mt-8">
              <div className="flex gap-2 items-center justify-center max-w-5xl mb-8">
                <div className="flex flex-col gap-4 items-center">
                  <h1 className="text-lg md:text-xl bg-clip-text text-transparent bg-linear-to-r from-secondary to-primary font-bold mb-4">
                    Parece que houve um erro ao gerar um estudo com a IA,
                    Estamos trabalhando para resolver!
                  </h1>
                  <p className="text-base md:text-lg text-foreground mb-8">
                    Deseja gerar um estudo com dados simulados?
                  </p>
                  <div className="flex w-full justify-around">
                    <Button type="outline" onClick={onNo}>
                      <IoMdClose className="h-5 w-5" />
                      Não
                    </Button>
                    <Button type="normal" onClick={onYes}>
                      <IoMdCheckmark className="h-5 w-5" />
                      Sim
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
