import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function Home({
  setStudyData,
}: {
  setStudyData: (data: any) => void;
}) {
  const navigate = useNavigate();
  const hasStudy = localStorage.getItem("studyai_data");
  const hasInit = sessionStorage.getItem("init");

  const initData = `{
    "tema": "",
    "resumo": [],
    "insights": [],
    "dicas": [],
    "exercicios": []
}`;

  useEffect(() => {
    if (hasInit) {
      navigate("/dashboard");
    }
  }, []);

  /*function canUseAI() {
    const count = Number(localStorage.getItem("ai_usage") || 0);

    if (count >= 5) {
      alert("Limite diário atingido");
      return false;
    }

    localStorage.setItem("ai_usage", String(count + 1));
    return true;
  }*/

  function initStudy() {
    const text = JSON.parse(initData);
    setStudyData(text);
    navigate("/dashboard");
    sessionStorage.setItem("init", "0");
  }

  function continueStudy() {
    navigate("/dashboard");
    sessionStorage.setItem("init", "0");
  }

  return (
    <div className="w-full h-full home fixed inset-x-0 z-50 p-5 border-none">
      <div className="flex justify-center items-center h-full w-full">
        <div className="h-xl w-xl flex flex-col items-center bg-card-background rounded-2xl text-foreground-dark p-4 inset-x-0 z-50">
          <div className="justify-center items-center w-full flex flex-col gap-6 mt-8">
            <div className="flex gap-2 items-center justify-center max-w-5xl mb-8">
              <div className="flex flex-col gap-4 items-center">
                <div className="max-w-7xl justify-center items-center w-full flex flex-col">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src="./icon.svg"
                        alt="Logo"
                        className="h-10 w-10 mr-2 inline-block"
                      />
                      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        Study.AI
                      </h1>
                    </div>

                    <p className="text-foreground mt-4 mb-4">
                      Potencialize seu aprendizado com o{" "}
                      <span className="font-semibold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary ">
                        Study.AI
                      </span>
                      : nossa tecnologia transforma conteúdos complexos em um
                      ecossistema de estudo inteligente. Tenha acesso imediato a
                      resumos estruturados, dicas estratégicas de memorização e
                      um modo prático 100% interativo que se adapta ao seu
                      ritmo.
                    </p>
                  </div>
                </div>
                {hasStudy ? (
                  <Button onClick={continueStudy} type="normal">
                    Continuar Estudo
                  </Button>
                ) : (
                  <Button onClick={initStudy} type="normal">
                    Iniciar Estudo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
