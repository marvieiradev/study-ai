import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { useState, type SetStateAction } from "react";
import { generateStudyContent } from "../services/gemini";
import { estudo } from "../data/estudo";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "./Loading";

export function GenerateStudy({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  const [text, setText] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [invisible, setInvisible] = useState(false);

  const navigate = useNavigate();
  const hasStudy = localStorage.getItem("studyai_data")!;
  const data = JSON.parse(hasStudy);

  async function handleGenerate() {
    if (!text) return;
    try {
      setShowLoading(true);
      setInvisible(true);
      const data = await generateStudyContent(text);
      console.log("Dados gerados:", data);
      setStudyData(data);
    } catch (err) {
      alert("Erro ao gerar conteúdo");
      setShowLoading(false);
    } finally {
      setShowLoading(false);
      navigate(0);
    }
  }

  function generateTestData() {
    setShowLoading(true);
    const text = JSON.parse(
      JSON.stringify(estudo[Math.floor(Math.random() * estudo.length)])
    );
    setTimeout(() => {
      setStudyData(text);
      setShowLoading(false);
      navigate(0);
    }, 4000);
  }

  return (
    <>
      <div
        className={`w-full h-full bg-white/80 fixed inset-x-0 z-50 p-5 ${
          invisible ? "opacity-0" : ""
        }`}
      >
        <div className="h-full w-full flex flex-col items-center bg-gray-50 border-4 border-gray-200 rounded-2xl text-gray-800 p-4 inset-x-0 z-50">
          <div className="flex w-full justify-end">
            <button className="" onClick={onClose}>
              <IoMdCloseCircle className="h-8 w-8 text-gray-700 cursor-pointer" />
            </button>
          </div>
          <div className="max-w-7xl justify-center items-center w-full flex flex-col gap-6 mt-8">
            <div className="flex gap-2 items-center justify-center max-w-5xl mb-8">
              <h1 className="text-lg md:text-2xl text-gray-600">
                Use o{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-sky-500 font-bold">
                  Study AI
                </span>{" "}
                para gerar um estudo inteligente, com resumo, dicas e um modo
                prática totalmente interativo
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
            <Button type="normal" onClick={generateTestData}>
              Gerar
            </Button>
          </div>
          {hasStudy && data.tema && (
            <p className="font-semibold mt-10 text-red-500">
              Já existe um estudo! Gerar um novo estudo, substituirá o estudo
              atual.
            </p>
          )}
        </div>
      </div>
      <Loading open={showLoading} />
    </>
  );
}
function setStudyData(data: any) {
  localStorage.setItem("studyai_data", JSON.stringify(data));
}
