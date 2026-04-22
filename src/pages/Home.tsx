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
    <>
      <div className="h-screen w-full  flex flex-col bg-gray-100 text-gray-800 justify-center items-center p-4 gap-6">
        <div className="max-w-7xl justify-center items-center w-full flex flex-col">
          <div className="flex gap-2 items-center justify-center">
            <img
              src="./favicon.svg"
              alt="Logo"
              className="h-8 w-8 mr-2 inline-block"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-sky-500">
              Study AI
            </h1>
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
    </>
  );
}
