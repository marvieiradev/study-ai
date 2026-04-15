import { useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { generateStudyContent } from "../services/gemini";

export default function Home({
  setStudyData,
}: {
  setStudyData: (data: any) => void;
}) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const hasStudy = localStorage.getItem("studyai_data");

  async function handleGenerate() {
    if (!text) return;

    try {
      const data = await generateStudyContent(text);
      console.log("Dados gerados:", data);
      setStudyData(data);
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao gerar conteúdo");
    }
  }

  function canUseAI() {
    const count = Number(localStorage.getItem("ai_usage") || 0);

    if (count >= 5) {
      alert("Limite diário atingido");
      return false;
    }

    localStorage.setItem("ai_usage", String(count + 1));
    return true;
  }

  return (
    <>
      <div className="h-screen w-full  flex flex-col bg-gray-100 text-gray-800 justify-center items-center p-4">
        <div className="max-w-7xl justify-center items-center w-full flex flex-col gap-6">
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

          <Textarea
            value={text}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setText(e.target.value)
            }
            placeholder="Cole aqui o texto que deseja estudar"
            className="h-50 max-w-5xl border-2 border-gray-200"
          />
          <Button onClick={handleGenerate}>Gerar</Button>
        </div>
        {hasStudy && (
          <div className="w-full mt-10 bg-gray-200 flex justify-center items-center p-2 gap-4">
            <h2 className="text-lg text-sky-600 font-bold">
              Bem vindo de volta! Continue seu estudo ou revise suas métricas.
            </h2>
            <Button onClick={() => navigate("/dashboard")} variant="secondary">
              Continuar Estudo
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
