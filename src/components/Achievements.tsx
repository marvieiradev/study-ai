import { IoMdCloseCircle } from "react-icons/io";
import { getAchievements } from "../services/metrics";
import { FaTrophy } from "react-icons/fa6";

export function Achievements({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const achievements = getAchievements();

  if (!open) return null;

  return (
    <div className="w-full h-full bg-foreground-dark/90 fixed inset-x-0 z-60 p-5">
      <div className="flex w-full h-full justify-center items-center">
        <div className="h-full w-full max-w-5xl flex flex-col items-center bg-card-background border-4 border-card-background rounded-2xl text-foreground-dark p-4 inset-x-0 z-50 overflow-auto">
          <div className="flex w-full justify-end">
            <button
              className=""
              onClick={() => {
                onClose();
              }}
            >
              <IoMdCloseCircle className="h-8 w-8 text-foreground hover:text-foreground-dark cursor-pointer" />
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary font-bold mb-4 md:mb-10">
              Conquistas
            </h2>

            {achievements.length === 0 && (
              <p className="text-foreground-light mt-8">
                Nenhuma conquista ainda
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {achievements.map((ach: any) => (
                <div
                  key={ach.id}
                  className="bg-secondary-light/30 p-3 rounded-xl flex gap-3 items-center"
                >
                  <FaTrophy className="w-10 h-10 text-primary text-shadow-xs text-shadow-primary-light" />
                  <div>
                    <p className="text-primary-accent text-shadow-xs text-shadow-primary-light font-bold">
                      {ach.title}
                    </p>
                    <p className="text-xs text-secondary text-shadow-xs text-shadow-secondary-light mt-2">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
